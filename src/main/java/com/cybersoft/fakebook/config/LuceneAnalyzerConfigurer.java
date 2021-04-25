package com.cybersoft.fakebook.config;

import org.apache.lucene.analysis.core.LowerCaseFilterFactory;
import org.apache.lucene.analysis.miscellaneous.ASCIIFoldingFilterFactory;
import org.apache.lucene.analysis.ngram.EdgeNGramFilterFactory;
import org.apache.lucene.analysis.ngram.NGramFilterFactory;
import org.apache.lucene.analysis.snowball.SnowballPorterFilterFactory;
import org.apache.lucene.analysis.standard.StandardTokenizerFactory;
import org.hibernate.search.backend.lucene.analysis.LuceneAnalysisConfigurationContext;
import org.hibernate.search.backend.lucene.analysis.LuceneAnalysisConfigurer;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Component("luceneAnalyzerConfigurer")
public class LuceneAnalyzerConfigurer implements LuceneAnalysisConfigurer {
    /*@Override
    public void configure(LuceneAnalysisConfigurationContext luceneAnalysisConfigurationContext) {
        luceneAnalysisConfigurationContext.analyzer("name").custom()
                .tokenizer( StandardTokenizerFactory.class )
                .tokenFilter( LowerCaseFilterFactory.class )
                .tokenFilter( ASCIIFoldingFilterFactory.class )
                .tokenFilter(NGramFilterFactory.class)
                    .param("minGramSize","2")
                    .param("maxGramSize","2");
    }*/

    @Override
    public void configure(LuceneAnalysisConfigurationContext context) {
        context.analyzer( "autocomplete-indexing" ).custom()
                .tokenizer( StandardTokenizerFactory.class )
                .tokenFilter( LowerCaseFilterFactory.class )
                .tokenFilter( SnowballPorterFilterFactory.class )
                .param( "language", "English" )
                .tokenFilter( ASCIIFoldingFilterFactory.class )
                .tokenFilter( EdgeNGramFilterFactory.class )
                .param( "minGramSize", "2" )
                .param( "maxGramSize", "7" );

        // Same as "autocomplete-indexing", but without the edge-ngram filter
        context.analyzer( "autocomplete-query" ).custom()
                .tokenizer( StandardTokenizerFactory.class )
                .tokenFilter( LowerCaseFilterFactory.class )
                .tokenFilter( SnowballPorterFilterFactory.class )
                .param( "language", "English" )
                .tokenFilter( ASCIIFoldingFilterFactory.class );
    }
}
