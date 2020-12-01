package models.rest;

import java.util.Map;

import com.avaje.ebean.Model;
import com.google.common.collect.Maps;

public class Member extends Model {

	protected Long id;
	protected String email;
	protected String gender;
	protected String name;
	protected String facebookId;
	protected String facebookEmail;
	protected String facebookName;
	protected Map<Long, String> roles;

	public Member() {
		super();
		this.id = -1L;
		this.email = "";
		this.gender = "";
		this.name = "";
		this.facebookId = "";
		this.facebookEmail = "";
		this.facebookName = "";

		roles = Maps.newHashMap();
	}

	public Member(models.Member member) {
		super();
		this.id = member.getId();
		this.email = member.getEmail();
		this.gender = member.getGender();
		this.name = member.getName();
		this.facebookId = member.getFacebookId();
		this.facebookEmail = member.getFacebookEmail();
		this.facebookName = member.getFacebookName();

		roles = Maps.newHashMap();
		for (models.Role role : member.getRoles()) {
			roles.put(role.getId(), role.getName());
		}
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getFacebookId() {
		return facebookId;
	}

	public void setFacebookId(String facebookId) {
		this.facebookId = facebookId;
	}

	public String getFacebookEmail() {
		return facebookEmail;
	}

	public void setFacebookEmail(String facebookEmail) {
		this.facebookEmail = facebookEmail;
	}

	public String getFacebookName() {
		return facebookName;
	}

	public void setFacebookName(String facebookName) {
		this.facebookName = facebookName;
	}

	public Map<Long, String> getRoles() {
		return roles;
	}

	public void setRoles(Map<Long, String> roles) {
		this.roles = roles;
	}

}
