package it.chalmers.gamma.service;

import it.chalmers.gamma.db.entity.Authority;
import it.chalmers.gamma.db.entity.AuthorityLevel;
import it.chalmers.gamma.db.entity.FKITGroup;
import it.chalmers.gamma.db.entity.Membership;
import it.chalmers.gamma.db.entity.Post;
import it.chalmers.gamma.db.entity.pk.AuthorityPK;
import it.chalmers.gamma.db.repository.AuthorityRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

@Service
public class AuthorityService {

    private final AuthorityRepository authorityRepository;

    public AuthorityService(AuthorityRepository authorityRepository) {
        this.authorityRepository = authorityRepository;
    }

    public void setAuthorityLevel(FKITGroup group, Post post, AuthorityLevel authorityLevel) {
        Authority authority = this.authorityRepository.findById_FkitGroupAndAndId_Post(group, post);
        if (authority == null) {
            authority = new Authority();
            AuthorityPK pk = new AuthorityPK();
            pk.setFkitGroup(group);
            pk.setPost(post);
   //         authority.setId(pk);
        }
        authority.setAuthorityLevel(authorityLevel);
        this.authorityRepository.save(authority);
    }

    public Authority getAuthorityLevel(FKITGroup group, Post post) {
        return this.authorityRepository.findById_FkitGroupAndAndId_Post(group, post);
    }

    public void removeAuthority(FKITGroup group, Post post) {
        Authority authority = this.authorityRepository.findById_FkitGroupAndAndId_Post(group, post);
        this.authorityRepository.delete(authority);
    }

    @Transactional
    public void removeAuthority(UUID id) {
        this.authorityRepository.deleteByInternalId(id);
    }

    public List<AuthorityLevel> getAuthorities(List<Membership> memberships) {
        List<AuthorityLevel> authorityLevels = new ArrayList<>();
        for (Membership membership : memberships) {
            Authority authority = getAuthorityLevel(membership.getId().getFKITGroup(), membership.getPost());
            if (authority != null) {
                authorityLevels.add(authority.getAuthorityLevel());
            }
        }
        return authorityLevels;
    }

    public List<Authority> getAllAuthorities() {
        return this.authorityRepository.findAll();
    }

    public List<Authority> getAllAuthoritiesWithAuthorityLevel(AuthorityLevel authorityLevel) {
        return this.authorityRepository.findAllByAuthorityLevel(authorityLevel);
    }

    public Authority getAuthority(UUID id) {
        return this.authorityRepository.findByInternalId(id);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        AuthorityService that = (AuthorityService) o;
        return this.authorityRepository.equals(that.authorityRepository);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.authorityRepository);
    }

    @Override
    public String toString() {
        return "AuthorityService{"
            + "authorityRepository=" + this.authorityRepository
            + '}';
    }
}
