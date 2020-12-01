package models.rest;

import java.util.List;

import com.google.common.collect.Lists;

/**
 * 存放Play載入頁面時要顯示的必要欄位
 * 
 * @author 170134
 *
 */
public class ViewState {

	private String memberId = "";
	private String memberName = "";
	private List<String> memberRoles = Lists.newArrayList();

	private String facebookId = "";
	private String facebookName = "";

	private String pageTitle = "";

	public String getMemberId() {
		return memberId;
	}

	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}

	public String getMemberName() {
		return memberName;
	}

	public void setMemberName(String memberName) {
		this.memberName = memberName;
	}

	public List<String> getMemberRoles() {
		return memberRoles;
	}

	public void setMemberRoles(List<String> memberRoles) {
		this.memberRoles = memberRoles;
	}

	public String getFacebookId() {
		return facebookId;
	}

	public void setFacebookId(String facebookId) {
		this.facebookId = facebookId;
	}

	public String getFacebookName() {
		return facebookName;
	}

	public void setFacebookName(String facebookName) {
		this.facebookName = facebookName;
	}

	public String getPageTitle() {
		return pageTitle;
	}

	public void setPageTitle(String pageTitle) {
		this.pageTitle = pageTitle;
	}

}
