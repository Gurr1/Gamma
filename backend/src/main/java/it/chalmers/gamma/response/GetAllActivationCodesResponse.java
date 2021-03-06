package it.chalmers.gamma.response;

import it.chalmers.gamma.db.entity.ActivationCode;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class GetAllActivationCodesResponse extends ResponseEntity<List<ActivationCode>> {

    public GetAllActivationCodesResponse(List<ActivationCode> activationCodeList) {
        super(activationCodeList, HttpStatus.OK);
    }

}
