package it.chalmers.gamma.controller.administrationSubControllers;

import it.chalmers.gamma.db.entity.FKITGroup;
import it.chalmers.gamma.db.entity.ITUser;
import it.chalmers.gamma.db.entity.Post;
import it.chalmers.gamma.requests.AddUserGroupRequest;
import it.chalmers.gamma.response.CidNotFoundResponse;
import it.chalmers.gamma.response.PostDoesNotExistResponse;
import it.chalmers.gamma.response.UserAddedToGroupResponse;
import it.chalmers.gamma.service.FKITService;
import it.chalmers.gamma.service.ITUserService;
import it.chalmers.gamma.service.MembershipService;
import it.chalmers.gamma.service.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/admin/groups")
public class GroupMemberAdminController {
    private ITUserService itUserService;
    private PostService postService;
    private FKITService fkitService;
    private MembershipService membershipService;

    public GroupMemberAdminController(ITUserService itUserService, PostService postService, FKITService fkitService, MembershipService membershipService){
        this.itUserService = itUserService;
        this.postService = postService;
        this.fkitService = fkitService;
        this.membershipService = membershipService;
    }

    @RequestMapping(value = "/{id}/members", method = RequestMethod.POST)
    public ResponseEntity<String> addUserToGroup(@RequestBody AddUserGroupRequest request, @PathVariable("id") String id) {
        if (!itUserService.userExists(request.getUser())) {
            throw new CidNotFoundResponse();
        }
        if (!postService.postExists(request.getPost())) {
            throw new PostDoesNotExistResponse();
        }
        ITUser user = itUserService.loadUser(request.getUser());
        FKITGroup fkitGroup = fkitService.getGroup(UUID.fromString(id));
        Post post = postService.getPost(request.getPost());
        membershipService.addUserToGroup(fkitGroup, user, post, request.getUnofficialName(), request.getYear());
        return new UserAddedToGroupResponse();
    }
}