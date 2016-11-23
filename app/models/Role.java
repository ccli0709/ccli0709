package models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import org.joda.time.DateTime;

import com.avaje.ebean.Model;

import play.data.format.Formats;
import play.data.validation.Constraints;

@Entity
public class Role extends Model {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Long id;

	// 群組名稱
	@Constraints.Required
	protected String name;

	// 群組名稱說明
	protected String description;

	@ManyToMany(mappedBy = "roles", cascade = CascadeType.ALL)
	private List<Member> members;

	// 建檔時間
	@Formats.DateTime(pattern = "yyyy/MM/dd")
	private DateTime createTime;

	public static Finder<Long, Role> find = new Finder<Long, Role>(Role.class);

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public DateTime getCreateTime() {
		return createTime;
	}

	public void setCreateTime(DateTime createTime) {
		this.createTime = createTime;
	}

	public List<Member> getMembers() {
		return members;
	}

	public void setMembers(List<Member> members) {
		this.members = members;
	}

}
