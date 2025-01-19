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
    optArticleAuthorSelector = '.post-author',
    optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = '') { 
    console.log("funkcja generateTitleLinks działa");

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* declare a new constant articles and get all elements matching optArticleSelector */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log(articles);
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
      for (let tag of articleTagsArray) {
        /* Generate HTML of the link */
        const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;

        /* Add generated code to html variable */
        html += linkHTML;
      }
      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.insertAdjacentHTML('beforeend', html);
    }

    /* END LOOP: for every article: */
}
  
generateTags();

// według mnie o to chodziło w zadaniu ale próbując wcześniej bez tej funkcji efekt był taki że w liście
// wyświetlało tylko artykuły z danym tagiem, ale nie dało się ich kliknąć i otworzyć 
function filterArticlesByTag(tag) {
    // Zamiast ukrywać artykuły, będziemy je ukrywać w liście tytułów
    const allLinks = document.querySelectorAll('.titles a');
    
    for (let link of allLinks) {
        link.classList.remove('active');
    }

    const articlesWithTag = document.querySelectorAll('[data-tags~="' + tag + '"]');
    // Zaczynamy pokazywać tylko te artykuły w liście
    for (let article of articlesWithTag) {
        const articleId = article.getAttribute('id');
        const articleLink = document.querySelector('.titles a[href="#' + articleId + '"]');
        articleLink.classList.add('active');  // Podświetlamy link w liście tytułów
    }
}

function tagClickHandler(event){
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags) {
      /* remove class active */
      activeTag.classList.remove('active');
    }
    /* END LOOP: for each active tag link */

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll(`a[href="${href}"]`);

    /* START LOOP: for each found tag link */
    for (let tag of tagLinks) {
      /* add class active */
      tag.classList.add('active');
    }
    /* END LOOP: for each found tag link */
  
    /* execute function "filterArticlesByTag" with tag as argument */
    filterArticlesByTag(tag);
}
  
function addClickListenersToTags(){
    /* find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */
    for (const tagLink of tagLinks) {
      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
    }
    /* END LOOP: for each link */
}
  
addClickListenersToTags();

// Nowe funkcje do obsługi autorów:

function generateAuthors() {
  console.log("funkcja generateAuthors działa");
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  
  /* START LOOP: for every article: */
  for (const article of articles) {

    /* get the author's name from the data-author attribute */
    const authorName = article.getAttribute('data-author');

    /* find the author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    authorWrapper.innerHTML = ''; // clear the existing content

    /* create the author link */
    const authorHTML = `<a href="#author-${authorName}">${authorName}</a>`;

    /* insert the author link */
    authorWrapper.insertAdjacentHTML('beforeend', authorHTML);
  }

  /* END LOOP: for every article: */
}
// podobnie jak z tagami myślę że w ten sposób jest bardziej przejrzyście i wszystko lepiej działa

function filterArticlesByAuthor(author) {
  console.log(`Filtering articles by author: ${author}`);
  const allLinks = document.querySelectorAll('.titles a');
  
  for (let link of allLinks) {
      link.classList.remove('active');
  }

  const articlesWithAuthor = document.querySelectorAll('[data-author="' + author + '"]');
  // Zaczynamy pokazywać tylko te artykuły w liście
  for (let article of articlesWithAuthor) {
      const articleId = article.getAttribute('id');
      const articleLink = document.querySelector('.titles a[href="#' + articleId + '"]');
      articleLink.classList.add('active');  // Podświetlamy link w liście tytułów
  }
}

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');

  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');

  /* find all author links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */
  for (let activeAuthor of activeAuthors) {
    /* remove class active */
    activeAuthor.classList.remove('active');
  }
  /* END LOOP: for each active author link */

  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll(`a[href="${href}"]`);

  /* START LOOP: for each found author link */
  for (let authorLink of authorLinks) {
    /* add class active */
    authorLink.classList.add('active');
  }
  /* END LOOP: for each found author link */

  /* execute function "filterArticlesByAuthor" with author as argument */
  filterArticlesByAuthor(author);
}

function addClickListenersToAuthors(){
  /* find all links to authors */
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  /* START LOOP: for each link */
  for (const authorLink of authorLinks) {
    /* add authorClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
  }
  /* END LOOP: for each link */
}

generateAuthors(); // Generate authors
addClickListenersToAuthors(); // Add event listeners to authors