package com.cybersoft.fakebook.entity;

import com.cybersoft.fakebook.dto.UserDto;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.FullTextField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.GenericField;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.Indexed;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.IndexedEmbedded;
import org.hibernate.search.mapper.pojo.mapping.definition.annotation.KeywordField;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "user")
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Getter
@Setter
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
/*@AnalyzerDefs({
        @AnalyzerDef(name = "autocompleteEdgeAnalyzer",
                tokenizer = @TokenizerDef(factory = KeywordTokenizerFactory.class),
                filters = {
                        @TokenFilterDef(factory = PatternReplaceFilterFactory.class, params = {
                                @Parameter(name = "pattern",value = "([^a-zA-Z0-9\\.])"),
                                @Parameter(name = "replacement", value = " "),
                                @Parameter(name = "replace", value = "all") }),
                        @TokenFilterDef(factory = LowerCaseFilterFactory.class),
                        @TokenFilterDef(factory = StopFilterFactory.class),
                        @TokenFilterDef(factory = EdgeNGramFilterFactory.class, params = {
                                @Parameter(name = "minGramSize", value = "3"),
                                @Parameter(name = "maxGramSize", value = "50") }) }),

        @AnalyzerDef(name = "autocompleteNGramAnalyzer",
                tokenizer = @TokenizerDef(factory = StandardTokenizerFactory.class),

                filters = {
                        @TokenFilterDef(factory = WordDelimiterFilterFactory.class),
                        @TokenFilterDef(factory = LowerCaseFilterFactory.class),
                        @TokenFilterDef(factory = NGramFilterFactory.class, params = {
                                @Parameter(name = "minGramSize", value = "3"),
                                @Parameter(name = "maxGramSize", value = "5") }),
                        @TokenFilterDef(factory = PatternReplaceFilterFactory.class, params = {
                                @Parameter(name = "pattern",value = "([^a-zA-Z0-9\\.])"),
                                @Parameter(name = "replacement", value = " "),
                                @Parameter(name = "replace", value = "all") })
                }),

        @AnalyzerDef(name = "standardAnalyzer",
                tokenizer = @TokenizerDef(factory = StandardTokenizerFactory.class),
                filters = {
                        @TokenFilterDef(factory = WordDelimiterFilterFactory.class),
                        @TokenFilterDef(factory = LowerCaseFilterFactory.class),
                        @TokenFilterDef(factory = PatternReplaceFilterFactory.class, params = {
                                @Parameter(name = "pattern", value = "([^a-zA-Z0-9\\.])"),
                                @Parameter(name = "replacement", value = " "),
                                @Parameter(name = "replace", value = "all") })
                })
})
@JsonIgnoreProperties({"hibernateLazyInitializer","handler","friends","friendOf","follows","followers","post","comment"})*/
@Indexed
public class User{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String username;

    @FullTextField(analyzer = "autocomplete-indexing", searchAnalyzer = "autocomplete-query")
    private String name;

    private String email;
    private String password;
    private LocalDate dob;
    private String avatar;


    @ManyToMany
    @JoinTable(name="friendship",
            joinColumns=@JoinColumn(name="receiver_id"),
            inverseJoinColumns=@JoinColumn(name="requester_id")
    )
    private List<User> friends;

    @ManyToMany
    @JoinTable(name="friendship",
            joinColumns=@JoinColumn(name="requester_id"),
            inverseJoinColumns=@JoinColumn(name="receiver_id")
    )
    private List<User> friendOf;

    @ManyToMany
    @JoinTable(name = "follow",
            joinColumns = @JoinColumn(name="follower_id"),
            inverseJoinColumns = @JoinColumn(name = "target_id"))
    private List<User> follows;

    @ManyToMany
    @JoinTable(name = "follow",
            joinColumns = @JoinColumn(name="target_id"),
            inverseJoinColumns = @JoinColumn(name = "follower_id"))
    private List<User> followers;

    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY)
    private List<Post> post;

    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY)
    private List<Comment> comment;

    @ManyToMany
    @JoinTable(
            name = "post_like",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "post_id"))
    Set<Post> likedPosts;

    @ManyToMany
    @JoinTable(
            name= "chat_participant",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "chatroom_id")
    )
    @JsonManagedReference
    Set<Chatroom> chatroomSet;

    public User(UserDto userDto){
        this.id=userDto.getId();
        this.username=userDto.getUsername();
        this.name=userDto.getName();
        this.email=userDto.getEmail();
        this.password=userDto.getPassword();
        this.dob=userDto.getDob();
        this.avatar=userDto.getAvatar();
    }
}
