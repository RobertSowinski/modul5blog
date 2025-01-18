'use strict';

function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);
    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    }
    /* add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    console.log('clickedElement (with plus): ' + clickedElement);
    clickedElement.classList.add('active');
    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
    }
    
    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute("href");
    console.log(articleSelector);
    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);
    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
optTitleSelector = '.post-title',
optTitleListSelector = '.titles',
optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks() { 
    console.log("funkcja generateTitleLinks działa");

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* declare a new constant articles and get all elements matching optArticleSelector */
    const articles = document.querySelectorAll(optArticleSelector);

    /* for each article */
    for (const article of articles) {
        /* get the article id */
        const articleId = article.getAttribute('id');

        /* find the title element */
        const articleTitleElement = article.querySelector(optTitleSelector);

        /* get the title from the title element */
        const articleTitle = articleTitleElement.innerHTML;

        /* create HTML of the link */
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

        /* insert link into titleList */
        titleList.insertAdjacentHTML('beforeend', linkHTML);
    }
}
// przed titleClickHandler
generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

function generateTags(){
    console.log("funkcja generateTags działa");
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for (const article of articles) {
        

      /* find tags wrapper and delete list elements of ul*/
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);
      /* split tags into array */

      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);
      /* START LOOP: for each tag */
      for (const tag of articleTagsArray) {
        /* Generate HTML of the link */
        const linkHTML = `<li><a href="#tag-${tag}">${tag} </a></li>`;

        /* Add generated code to html variable */
        html += linkHTML;
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.insertAdjacentHTML('beforeend', html);
    }
      
  
    /* END LOOP: for every article: */
  }
  
  generateTags();