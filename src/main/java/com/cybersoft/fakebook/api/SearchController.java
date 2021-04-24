package com.cybersoft.fakebook.api;

import com.cybersoft.fakebook.service.SearchService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/search")
public class SearchController {
    private SearchService searchService;

    public SearchController(SearchService searchService){
        this.searchService = searchService;
    }

    @GetMapping()
    public Object search(@RequestParam("query") String string){
        try{
            System.out.println(string);
            return new ResponseEntity<Object>(searchService.search(string),HttpStatus.OK);
        } catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }
    }
}
