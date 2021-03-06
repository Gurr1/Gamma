package it.chalmers.gamma.response;

import it.chalmers.gamma.db.entity.Whitelist;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class GetWhitelistResponse extends ResponseEntity<Whitelist> {
    public GetWhitelistResponse(Whitelist whitelist) {
        super(whitelist, HttpStatus.ACCEPTED);
    }
}
