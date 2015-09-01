package com.wd.action;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.imageio.ImageIO;

import net.coobird.thumbnailator.Thumbnails;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;

import com.alibaba.fastjson.JSONObject;
import com.opensymphony.xwork2.ModelDriven;
import com.wd.receive.Image;

@Action(value = "imageAction")
public class ImageAction extends BaseAction implements ModelDriven<Image> {

	private static final long serialVersionUID = 1L;
	private static final int MaxWidth = 1200;
	
	Image image = new Image();

	@Override
	public Image getModel() {
		return image;
	}

	public void imageUpload() throws IOException {
		JSONObject json = new JSONObject();
		if (image.getImageContentType().substring(0, image.getImageContentType().indexOf("/")).equals("image")) {
			
			SimpleDateFormat tts = new SimpleDateFormat("yyyyMMddHHmmssmmm");
			SimpleDateFormat ttsf = new SimpleDateFormat("yyyyMM");
			Timestamp nt = new Timestamp((new Date()).getTime());
			String ts = tts.format(nt);

			String path = "/uploads/imgs/" + ttsf.format(nt);
			String imageName = ts + image.getImageFileName().substring(image.getImageFileName().lastIndexOf("."));

			//String destPath = ServletActionContext.getServletContext().getRealPath(path);

			if (null != image.getImage()) {
				File destFile = new File(new File(destPath), imageName);
				if (!destFile.getParentFile().exists())
					destFile.getParentFile().mkdirs();
				
				System.out.println(ImageIO.read(image.getImage()).getWidth());
				if (ImageIO.read(image.getImage()).getWidth() > MaxWidth) {
					Thumbnails.of(image.getImage())
						.width(MaxWidth)
						.toFile(destFile);
				} else {
					FileUtils.copyFile(image.getImage(), destFile);
				}
			}
			json.put("url", path + "/" + imageName);
			json.put("state", true);
		}
		super.writeJson(json);
	}
}