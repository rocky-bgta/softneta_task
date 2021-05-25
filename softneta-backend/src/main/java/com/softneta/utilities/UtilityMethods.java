/**
 * Created By: Md. Nazmus Salahin
 * Created Date:  25-May-2021
 * Time: 5:26 AM
 * Modified By:
 * Modified date:
 * (C) CopyRight Salahin ltd.
 */

package com.softneta.utilities;


import com.softneta.core.ResponseObject;
import org.springframework.http.HttpStatus;

public class UtilityMethods {
	public static ResponseObject buildResponseObject(Object object, String message, HttpStatus httpStatus){
		ResponseObject responseObject;
		responseObject = new ResponseObject(object, httpStatus.value(), message);
		return responseObject;
	}
}
