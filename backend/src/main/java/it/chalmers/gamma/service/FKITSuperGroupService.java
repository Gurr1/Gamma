package it.chalmers.gamma.service;

import it.chalmers.gamma.db.entity.FKITSuperGroup;
import it.chalmers.gamma.db.repository.FKITSuperGroupRepository;
import it.chalmers.gamma.requests.CreateSuperGroupRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class FKITSuperGroupService {
    FKITSuperGroupRepository repository;

    public FKITSuperGroupService(FKITSuperGroupRepository repository){
        this.repository = repository;
    }

    public FKITSuperGroup createSuperGroup(CreateSuperGroupRequest request){
        FKITSuperGroup group = new FKITSuperGroup();
        group.setName(request.getName());
        group.setPrettyName(request.getPrettyName() == null ? request.getName() : request.getPrettyName());
        group.setType(request.getType());
        return repository.save(group);
    }

    public FKITSuperGroup getGroup(UUID id){
        return repository.getById(id);
    }

    public boolean groupExists(String name){
        return repository.existsByName(name);
    }
    public boolean groupExists(UUID id){
        return repository.existsById(id);
    }

    public void removeGroup(UUID id){
        repository.deleteById(id);
    }
    public List<FKITSuperGroup> getAllGroups(){
        return repository.findAll();
    }

    public void updateSuperGroup(UUID id, CreateSuperGroupRequest request){
        FKITSuperGroup group = repository.getById(id);
        group.setType(request.getType() == null ? group.getType() : request.getType());
        group.setName(request.getName() == null ? group.getName() : request.getName());
        group.setPrettyName(request.getPrettyName() == null ? group.getPrettyName() : request.getPrettyName());
    }
}
