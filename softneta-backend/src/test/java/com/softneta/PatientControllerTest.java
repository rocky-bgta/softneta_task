package com.softneta;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.softneta.constant.MessageConstant;
import com.softneta.controller.PatientController;
import com.softneta.core.ResponseObject;
import com.softneta.entities.PatientEntity;
import com.softneta.entities.StudyEntity;
import com.softneta.service.PatientService;
import com.softneta.utilities.UtilityMethods;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertEquals;


@WebMvcTest(value = PatientController.class)
@RunWith(SpringRunner.class)
public class PatientControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PatientService patientService;

    @Test
    public void testCreatePatientInfo() throws Exception{
        PatientEntity mockPatient = new PatientEntity();
	    mockPatient.setPersonCode("ISBN-101");
	    mockPatient.setFirstName("Sonia");
	    mockPatient.setLastName("Yeasmin");
	    
        StudyEntity mockStudy= new StudyEntity();
	    mockStudy.setName("X-Ray");
	    mockStudy.setDescription("Minor case");
	    
	    mockPatient.getStudyList().add(mockStudy);

        ResponseObject responseObject = UtilityMethods.buildResponseObject(mockPatient,
                MessageConstant.SUCCESSFULLY_CREATED,
                HttpStatus.OK);
        
        String inputInJson = this.mapToJson(responseObject);

        String URI = "/api/patient-info/create";

        Mockito.when(patientService.createPatient(Mockito.any(PatientEntity.class))).thenReturn(responseObject);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .post(URI)
                .accept(MediaType.APPLICATION_JSON).content(inputInJson)
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        MockHttpServletResponse response = result.getResponse();

        String outputInJson = response.getContentAsString();

        assertThat(outputInJson).isEqualTo(inputInJson);
        assertEquals(HttpStatus.OK.value(), response.getStatus());
    }


    @Test
    public void testUpdatePatientInfo() throws Exception{
	    PatientEntity mockPatient = new PatientEntity();
	    UUID uuid = UUID.randomUUID();
	    mockPatient.setId(uuid);
	    mockPatient.setPersonCode("ISBN-101");
	    mockPatient.setFirstName("Sonia");
	    mockPatient.setLastName("Yeasmin");
	    mockPatient.setDob(null);
	    
	    StudyEntity mockStudy= new StudyEntity();
	    uuid = UUID.randomUUID();
	    mockStudy.setId(uuid);
	    mockStudy.setName("X-Ray");
	    mockStudy.setDescription("Minor case");
	    mockStudy.setDate(null);
	    mockPatient.getStudyList().add(mockStudy);
	    
        ResponseObject responseObject = UtilityMethods.buildResponseObject(mockPatient,
                MessageConstant.SUCCESSFULLY_UPDATED,
                HttpStatus.OK);


        String inputInJson = this.mapToJson(responseObject);

        String URI = "/api/patient-info/update";

        Mockito.when(patientService.updatePatient(Mockito.any(PatientEntity.class))).thenReturn(responseObject);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .put(URI)
                .accept(MediaType.APPLICATION_JSON)
                .content(inputInJson)
                .contentType(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        MockHttpServletResponse response = result.getResponse();

        String outputInJson = response.getContentAsString();

        assertThat(outputInJson).isEqualTo(inputInJson);
        assertEquals(HttpStatus.OK.value(), response.getStatus());
    }

    @Test
    public void testGetAllPatient() throws Exception{
	    PatientEntity mockPatient = new PatientEntity();
	    UUID uuid = UUID.randomUUID();
	    mockPatient.setId(uuid);
	    mockPatient.setPersonCode("ISBN-101");
	    mockPatient.setFirstName("Sonia");
	    mockPatient.setLastName("Yeasmin");
	    mockPatient.setDob(null);
	    
	    StudyEntity mockStudy= new StudyEntity();
	    uuid = UUID.randomUUID();
	    mockStudy.setId(uuid);
	    mockStudy.setName("X-Ray");
	    mockStudy.setDescription("Minor case");
	    mockStudy.setDate(null);
	
	    mockPatient.getStudyList().add(mockStudy);
	    
        ResponseObject responseObject = UtilityMethods.buildResponseObject(mockPatient,
                MessageConstant.SUCCESSFULLY_GET_ALL,
                HttpStatus.OK);

        String inputInJson = this.mapToJson(responseObject);

        String URI = "/api/patient-info/list";

        Mockito.when(patientService.getAllPatientInfo()).thenReturn(responseObject);

        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get(URI)
                .accept(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        MockHttpServletResponse response = result.getResponse();

        String outputInJson = response.getContentAsString();

        assertThat(outputInJson).isEqualTo(inputInJson);
        assertEquals(HttpStatus.OK.value(), response.getStatus());
    }

    @Test
    public void testGetGatewayById() throws Exception {
	    PatientEntity mockPatient = new PatientEntity();
	    UUID uuid = UUID.randomUUID();
	    mockPatient.setId(uuid);
	    mockPatient.setPersonCode("ISBN-101");
	    mockPatient.setFirstName("Sonia");
	    mockPatient.setLastName("Yeasmin");
	    mockPatient.setDob(null);
	
	    StudyEntity mockStudy= new StudyEntity();
	    uuid = UUID.randomUUID();
	    mockStudy.setId(uuid);
	    mockStudy.setName("X-Ray");
	    mockStudy.setDescription("Minor case");
	    mockStudy.setDate(null);
	
	    mockPatient.getStudyList().add(mockStudy);

        ResponseObject responseObject =  UtilityMethods.buildResponseObject(mockPatient,
                MessageConstant.SUCCESSFULLY_GET_BY_ID,
                HttpStatus.OK);

        Mockito.when(patientService.getPatientById(Mockito.any())).thenReturn(responseObject);

        String URI = "/api/patient-info/get/eb7998f9-5561-470b-93df-a5529d4f8dca";
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .get(URI)
                .accept(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        String expectedJson = this.mapToJson(responseObject);
        String outputInJson = result.getResponse().getContentAsString();
        assertThat(outputInJson).isEqualTo(expectedJson);
    }

    @Test
    public void testDeleteGatewayById() throws Exception {

        ResponseObject responseObject =  UtilityMethods.buildResponseObject(null,
                MessageConstant.SUCCESSFULLY_DELETE,
                HttpStatus.OK);

        Mockito.when(patientService.deletePatientById(Mockito.any())).thenReturn(responseObject);

        String URI = "/api/patient-info/delete/eb7998f9-5561-470b-93df-a5529d4f8dca";
        RequestBuilder requestBuilder = MockMvcRequestBuilders
                .delete(URI)
                .accept(MediaType.APPLICATION_JSON);

        MvcResult result = mockMvc.perform(requestBuilder).andReturn();
        String expectedJson = this.mapToJson(responseObject);
        String outputInJson = result.getResponse().getContentAsString();
        assertThat(outputInJson).isEqualTo(expectedJson);
    }
    
    private String mapToJson(Object object) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.writeValueAsString(object);
    }

}
