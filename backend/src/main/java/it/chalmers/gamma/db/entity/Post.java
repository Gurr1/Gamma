package it.chalmers.gamma.db.entity;


import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "post")

public class Post {

    @Id
    @Column(updatable = false)
    private UUID id;


    @JoinColumn(name = "post_name")
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Text postName;
    public Post(){
        this.postName = new Text();
        this.id = UUID.randomUUID();
    }
    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    @JsonProperty("sv")
    public void setSVPostName(String postName){
        this.postName.setSv(postName);
    }
    @JsonProperty("en")
    public void setENPostName(String postName){
        this.postName.setEn(postName);
    }
   public String getSVPostName(){
        return postName.getSv();
    }
    public String getENPostName(){
        return postName.getEn();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Post post = (Post) o;
        return Objects.equals(id, post.id) &&
                Objects.equals(postName, post.postName);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, postName);
    }

    @Override
    public String toString() {
        return "Post{" +
                "id=" + id +
                ", postName='" + postName + '\'' +
                '}';
    }
}