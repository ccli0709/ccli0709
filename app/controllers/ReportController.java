package controllers;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import models.Task;
import models.rest.ViewState;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.data.JRMapCollectionDataSource;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
import play.Logger;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Http.Context;

/**
 * This controller contains an action to handle HTTP requests to the
 * application's home page.
 */
public class ReportController extends Controller {

	public Result index() {

		ViewState viewState = Secured.getViewState(Context.current());
		viewState.setPageTitle("JASPERREPORT測試");
		return ok(views.html.report.index.render(viewState));
	}

	public Result unicode() {

		String jsFile = "reports/unicode.jrxml";

		ArrayList<ReportObject> dataList = new ArrayList<ReportObject>();
		for (int i = 0; i <= 100; i++) {
			ReportObject rpdata = new ReportObject();
			rpdata.shipNo = "AC001";
			rpdata.invoiceNo = "104P00001";
			rpdata.amount = "500,000,000";
			dataList.add(rpdata);
		}

		ByteArrayOutputStream baos = new ByteArrayOutputStream();

		try {

			// ===============================
			// 建立存放record的資料結構

			List<Map<String, ?>> list = new ArrayList<Map<String, ?>>();

			// put dummy records
			for (int i = 0; i < 3; i++) {
				Map<String, Object> data = new HashMap<String, Object>();
				data.put("shipNo", "AC00" + i);
				data.put("invoiceNo", "104P00000" + i);
				data.put("amount", String.valueOf((int) (Math.random() * 100000)));

				if (i == 0)
					data.put("remarks", "堃嫺竪坔峯");
				else if (i == 1)
					data.put("remarks", "初めまして");
				else if (i == 2)
					data.put("remarks", "在计算机媒介上被广泛使用");

				list.add(data);
			}

			// 建立JRMapCollectionDataSource
			JRDataSource datasource = new JRMapCollectionDataSource(list);
			// ===============================

			// InputStream inputStream =
			// play.Play.application().resourceAsStream(jsFile);
			// InputStream inputStream =
			// play.Play.application().resourceAsStream(jsFile);

			InputStream inputStream = play.Play.application().resourceAsStream("public/reports/unicode.jrxml");
			// InputStream inputStream = new FileInputStream(
			// new
			// File("D:\\play\\projects\\ccli0709\\public\\reports\\unicode.jrxml"));

			JRBeanCollectionDataSource beanColDataSource = new JRBeanCollectionDataSource(dataList);
			Map<String, Object> parameters = new HashMap<String, Object>();
			parameters.put("DS1", beanColDataSource);
			parameters.put("RP_TITLE", "中鋼公司 DEBIT NOTE");
			parameters.put("RP_PAYEE_ADDRESS",
					"BM ALLIANCE COAL MARKETING PTY LTD RIVERSIDE CENTRE 123 EAGLE STREET BRISLANE QUEENSLAND AUSTRALIA");
			parameters.put("RP_PAY_DATE", "2015/01/01");
			parameters.put("RP_CSC_CONTRACT_NO", "03C1P0118");
			parameters.put("RP_AMOUNT", "USD 49,206.66");

			JasperDesign jasperDesign = JRXmlLoader.load(inputStream);
			JasperReport jasperReport = JasperCompileManager.compileReport(jasperDesign);
			// JasperPrint jasperPrint = JasperFillManager.fillReport(
			// jasperReport, parameters, new JREmptyDataSource());

			JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, datasource);
			JasperExportManager.exportReportToPdfStream(jasperPrint, baos);

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			Logger.error(e.getMessage());
		}

		InputStream is = new ByteArrayInputStream(baos.toByteArray());

		return ok(is).as("application/pdf");

		// 另存新檔在伺服器上的方法
		// JasperExportManager.exportReportToPdfFile(jasperPrint, outFile);

	}
}

class ReportObject {
	public String shipNo;
	public String invoiceNo;
	public String amount;
}