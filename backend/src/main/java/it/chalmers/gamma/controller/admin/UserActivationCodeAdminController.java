package it.chalmers.gamma.controller.admin;

import it.chalmers.gamma.db.entity.ActivationCode;
import it.chalmers.gamma.response.ActivationCodeDeletedResponse;
import it.chalmers.gamma.response.ActivationCodeDoesNotExistResponse;
import it.chalmers.gamma.response.GetActivationCodeResponse;
import it.chalmers.gamma.response.GetAllActivationCodesResponse;
import it.chalmers.gamma.service.ActivationCodeService;

import java.util.List;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/activation_codes")
public final class UserActivationCodeAdminController {

    private final ActivationCodeService activationCodeService;

    public UserActivationCodeAdminController(ActivationCodeService activationCodeService) {
        this.activationCodeService = activationCodeService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<ActivationCode>> getAllActivationCodes() {
        return new GetAllActivationCodesResponse(this.activationCodeService.getAllActivationCodes());
    }

    @RequestMapping(value = "/{activationCode}", method = RequestMethod.GET)
    public ResponseEntity<ActivationCode> getActivationCode(
            @PathVariable("activationCode") String activationCode) {
        if (!this.activationCodeService.codeExists(UUID.fromString(activationCode))) {
            throw new ActivationCodeDoesNotExistResponse();
        }
        return new GetActivationCodeResponse(
                this.activationCodeService.getActivationCode(UUID.fromString(activationCode)));
    }

    @RequestMapping(value = "/{activationCode}", method = RequestMethod.DELETE)
    public ResponseEntity<String> removeActivationCode(@PathVariable("activationCode") String activationCode) {
        if (!this.activationCodeService.codeExists(UUID.fromString(activationCode))) {
            throw new ActivationCodeDoesNotExistResponse();
        }
        this.activationCodeService.deleteCode(UUID.fromString(activationCode));
        return new ActivationCodeDeletedResponse();
    }
}
