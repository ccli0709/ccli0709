package models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

import com.avaje.ebean.Expr;
import com.avaje.ebean.ExpressionList;
import com.avaje.ebean.Model;
import com.avaje.ebean.PagedList;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import play.data.format.Formats;
import play.data.validation.Constraints;

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
public class Task extends Model {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Constraints.Min(10)
	private Long id;

	@Constraints.Required
	private String name;

	private Boolean done;

	@Formats.DateTime(pattern = "yyyy/MM/dd")
	public DateTime dueDate = new DateTime();

	public static Finder<Long, Task> find = new Finder<Long, Task>(Task.class);

	public static PagedList<Task> getPagedList(models.rest.Pagination pagination) {

		ExpressionList<Task> where = find.where();

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

	public Boolean isDone() {
		return done;
	}

	public void setDone(Boolean done) {
		this.done = done;
	}

	public String getDueDate() {
		DateTimeFormatter dtf = DateTimeFormat.forPattern("yyyy/MM/dd");
		return dtf.print(dueDate);
	}

	public void setDueDate(String dueDate) {
		this.dueDate = new DateTime();
	}

}