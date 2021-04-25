package com.cybersoft.fakebook.service;

import com.cybersoft.fakebook.dto.UserDto;
import com.cybersoft.fakebook.entity.User;
import com.cybersoft.fakebook.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.search.engine.search.query.SearchResult;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.massindexing.MassIndexer;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
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

    private EntityManager entityManager;
    @Transactional
    public void initIndex() {

        try {
            SearchSession searchSession = Search.session( entityManager );

            MassIndexer indexer = searchSession.massIndexer( User.class )
                    .threadsToLoadObjects( 7 );
            indexer.startAndWait();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

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

    public List<UserDto> search(String queryString) {
        SearchSession searchSession = Search.session( entityManager );
        SearchResult<User> searchResult = searchSession.search( User.class )
                .where( f -> f.match()
                        .fields( "name")
                        .matching( queryString ) )
                .fetch( 20 );
        List<User> hits = searchResult.hits();

        List<UserDto> result = new ArrayList<UserDto>();
        for(User x:hits){
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