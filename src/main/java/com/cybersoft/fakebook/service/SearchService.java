package com.cybersoft.fakebook.service;

import com.cybersoft.fakebook.dto.UserDto;
import com.cybersoft.fakebook.entity.User;
import com.cybersoft.fakebook.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.lucene.search.Query;
import org.hibernate.search.FullTextSession;
import org.hibernate.search.elasticsearch.ElasticsearchQueries;
import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.FullTextQuery;
import org.hibernate.search.jpa.Search;
import org.hibernate.search.query.dsl.QueryBuilder;
import org.hibernate.search.query.engine.spi.QueryDescriptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

/*
@Component
public class SearchService {
    @PersistenceContext
    private final EntityManager entityManager;
    private static final String TITLE_EDGE_NGRAM_INDEX = "edgeNGramTitle";
    private static final String TITLE_NGRAM_INDEX = "nGramTitle";

    public SearchService(EntityManager entityManager) throws InterruptedException {
        this.entityManager = entityManager;

    }



    @Transactional
    public List<User> fuzzySearch(String searchTerm) {

        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);
        QueryBuilder qb = fullTextEntityManager.getSearchFactory().buildQueryBuilder().forEntity(User.class).get();
        Query luceneQuery = qb.keyword().fuzzy().withEditDistanceUpTo(1).withPrefixLength(1).onFields("name")
                .matching(searchTerm).createQuery();

        javax.persistence.Query jpaQuery = fullTextEntityManager.createFullTextQuery(luceneQuery, User.class);

        // execute search

        List<User> userList = null;
        try {
            userList = jpaQuery.getResultList();
        } catch (NoResultException nre) {


        }

        return userList;


    }

    @Transactional
    public synchronized List getSuggestions(final String searchTerm) {


        QueryBuilder titleQB = Search.getFullTextEntityManager(entityManager).getSearchFactory()
                .buildQueryBuilder().forEntity(User.class).get();

        Query query = titleQB.phrase().withSlop(2).onField(TITLE_NGRAM_INDEX)
                .andField(TITLE_EDGE_NGRAM_INDEX).boostedTo(5)
                .sentence(searchTerm.toLowerCase()).createQuery();

        FullTextQuery fullTextQuery = Search.getFullTextEntityManager(entityManager).createFullTextQuery(
                query, User.class);
        fullTextQuery.setMaxResults(20);

        @SuppressWarnings("unchecked")
        List<User> results = fullTextQuery.getResultList();
        return results;
    }

    public List<User> searchUsernameByKeywordQuery(String text) {

        Query keywordQuery = getQueryBuilder()
                .keyword()
                .onField("username")
                .matching(text)
                .createQuery();

        List<User> results = getJpaQuery(keywordQuery).getResultList();

        return results;
    }



    private FullTextQuery getJpaQuery(org.apache.lucene.search.Query luceneQuery) {

        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);

        return fullTextEntityManager.createFullTextQuery(luceneQuery, User.class);
    }

    private QueryBuilder getQueryBuilder() {

        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);

        return fullTextEntityManager.getSearchFactory()
                .buildQueryBuilder()
                .forEntity(User.class)
                .get();
    }

}*/

@Component
@Slf4j
@AllArgsConstructor
public class SearchService {

    private UserRepository userRepository;

    public List<UserDto> querySearch(String queryString) {
        List<UserDto> result = new ArrayList<UserDto>();
        List<User> userList = userRepository.search(queryString);
        for(User x:userList){
            UserDto userDto = new UserDto();
            userDto.setId(x.getId());
            userDto.setAvatar(x.getAvatar());
            userDto.setName(x.getName());
            userDto.setUsername(x.getUsername());
            result.add(userDto);
        }
        if(result.isEmpty())
            System.out.println("empty");
        return result;
    }

}