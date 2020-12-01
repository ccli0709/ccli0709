package models.rest;

import com.google.common.base.Strings;

import play.mvc.Http.Request;

public class Pagination {

	private int totalItems;
	private int itemsPerPage;
	private int currentPage;
	private String sortField;
	private String sortDirection;
	private String queryString;

	public Pagination(Request request) {
		totalItems = 0;

		String currentPage = request.getQueryString("currentPage");
		try {
			this.setCurrentPage(Integer.parseInt(currentPage));
		} catch (Exception e) {
			this.setCurrentPage(1);
		}

		String itemsPerPage = request.getQueryString("itemsPerPage");
		try {
			this.setItemsPerPage(Integer.parseInt(itemsPerPage));
		} catch (Exception e) {
			this.setItemsPerPage(20);
		}

		String sortField = request.getQueryString("sortField");
		if (Strings.isNullOrEmpty(sortField))
			this.setSortField("id");
		else
			this.setSortField(sortField.trim());

		String sortDirection = request.getQueryString("sortDirection");
		if (!"desc".equals(sortDirection))
			sortDirection = "asc";
		this.setSortDirection(sortDirection);

		String queryString = request.getQueryString("queryString");
		if (Strings.isNullOrEmpty(queryString))
			this.setQueryString("");
		else
			this.setQueryString(queryString.trim());
	}

	public int getTotalItems() {
		return totalItems;
	}

	public void setTotalItems(int totalItems) {
		this.totalItems = totalItems;
	}

	public int getItemsPerPage() {
		return itemsPerPage;
	}

	public void setItemsPerPage(int itemsPerPage) {
		this.itemsPerPage = itemsPerPage;
	}

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	public String getSortField() {
		return sortField;
	}

	public void setSortField(String sortField) {
		this.sortField = sortField;
	}

	public String getSortDirection() {
		return sortDirection;
	}

	public void setSortDirection(String sortDirection) {
		this.sortDirection = sortDirection;
	}

	public String getQueryString() {
		return queryString;
	}

	public void setQueryString(String queryString) {
		this.queryString = queryString;
	}

}
