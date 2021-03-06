package it.chalmers.gamma.response;

import it.chalmers.gamma.db.entity.Post;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class GetMultiplePostsResponse extends ResponseEntity<List<Post>> {
    public GetMultiplePostsResponse(List<Post> post) {
        super(post, HttpStatus.ACCEPTED);
    }
}

