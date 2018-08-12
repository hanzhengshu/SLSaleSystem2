package org.slsale.controller;

import java.beans.PropertyEditorSupport;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.slsale.common.Constants;
import org.slsale.pojo.User;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
//所有controller的基类(当前用户)
public class BaseController {
	private Logger logger = Logger.getLogger(BaseController.class);
	
	private User currentUser;


	public User getCurrentUser() {
		if(null == this.currentUser){
			HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
			//getSession(false)默认为true,没有HttpSession创建一个HttpSession
			HttpSession session = request.getSession(false);//没有HttpSession返回空
			if(null != session){
				currentUser = (User)session.getAttribute(Constants.SESSION_USER);
			}else {
				currentUser = null;
			}
		}
		return currentUser;
	}

	public void setCurrentUser(User currentUser) {
		this.currentUser = currentUser;
	}
	/**
	 * 初始化绑定 @InitBinder
	 * 由@InitBinder表示的方法，可以对WebDataBinder对象进行初始化。
	 * WebDataBinder是DataBinder的子类，用于完成由表单到JavaBean属性的绑定。
	 * 日期国际化
	 */
	@InitBinder
	public void InitBinder(WebDataBinder dataBinder){
		dataBinder.registerCustomEditor(Date.class, new PropertyEditorSupport() {
		    public void setAsText(String value) {
		        try {
		            setValue(new SimpleDateFormat("yyyy-MM-dd").parse(value));
		        } catch(ParseException e) {
		            setValue(null);
		        }
		    }
		    public String getAsText() {
		        return new SimpleDateFormat("yyyy-MM-dd").format((Date) getValue());
		    }        

		});
	}
}
