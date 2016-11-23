package models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.joda.time.DateTime;

import com.avaje.ebean.Expr;
import com.avaje.ebean.ExpressionList;
import com.avaje.ebean.Model;
import com.avaje.ebean.PagedList;

import play.data.format.Formats;
import play.data.validation.Constraints;

@Entity
public class Member extends Model {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Long id;

	// 電子郵件
	@Constraints.Required
	protected String email;

	// 性別
	protected String gender;

	// 姓名
	@Constraints.Required
	protected String name;

	@ManyToMany(cascade = CascadeType.ALL)
	private List<Role> roles;

	// 臉書相關欄位
	protected String facebookId;
	protected String facebookEmail;
	protected String facebookName;

	// 最後登入時間
	@Formats.DateTime(pattern = "yyyy/MM/dd")
	private DateTime lastLoginTime;

	// 建檔時間
	@Formats.DateTime(pattern = "yyyy/MM/dd")
	private DateTime createTime;

	// 修改時間
	@Formats.DateTime(pattern = "yyyy/MM/dd")
	private DateTime updateTime;

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

	public List<Role> getRoles() {
		return roles;
	}

	public void setRoles(List<Role> roles) {
		this.roles = roles;
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

	public DateTime getLastLoginTime() {
		return lastLoginTime;
	}

	public void setLastLoginTime(DateTime lastLoginTime) {
		this.lastLoginTime = lastLoginTime;
	}

	public DateTime getCreateTime() {
		return createTime;
	}

	public void setCreateTime(DateTime createTime) {
		this.createTime = createTime;
	}

	public DateTime getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(DateTime updateTime) {
		this.updateTime = updateTime;
	}

	public static Finder<Long, Member> find = new Finder<Long, Member>(Member.class);

	public static PagedList<Member> getPagedList(models.rest.Pagination pagination) {

		ExpressionList<Member> where = find.where();

		String keyword = "";
		String[] queries = pagination.getQueryString().split(",");
		for (String query : queries) {
			query = query.trim();
			if (query.toLowerCase().startsWith("keyword:")) {
				keyword = query.substring(8).trim();
			}
		}

		if (keyword.length() > 0) {
			where.disjunction().add(Expr.contains("name", keyword));
		}

		// 搜尋結果排序
		where.orderBy(String.format("%s %s", pagination.getSortField(), pagination.getSortDirection()));
		return where.findPagedList(pagination.getCurrentPage() - 1, pagination.getItemsPerPage());
	}
}
