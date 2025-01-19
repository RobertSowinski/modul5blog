'use strict';

function titleClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);
    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }
    /* add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    console.log('clickedElement (with plus): ' + clickedElement);
    clickedElement.classList.add('active');
    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
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
    optAuthorsListSelector = '.authors.list',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix ='tag-size-',
    optAuthorClassPrefix = 'author-size-',
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

for (let link of links) {
  link.addEventListener('click', titleClickHandler);
}
function calculateTagsParams(tags) {
  // [NEW] Initialize params object with initial values
  const params = {
    max: 0,  // initial max value
    min: 999999  // initial min value
  };

  // [NEW] Iterate over the tags object to calculate the max and min values
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');  // Log the tag and its count

    // Update max if the current tag's count is greater than the current max
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }

    // Update min if the current tag's count is smaller than the current min
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }

  // [NEW] Return the params object containing max and min values
  return params;
}
function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  // Sprawdzenie, czy max i min są różne (zapobieganie dzieleniu przez zero)
  if (normalizedMax === 0) {
    return 1; // Domyślna wartość
  }
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return classNumber; // Zwróć numer klasy
}
function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (const article of articles) {
    /* find tags wrapper */
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

      /* [NEW] check if this tag is NOT already in allTags */
      //[tag] to to samo co .hasOwnProperty
      if (!allTags[tag]) {
        /* [NEW] add the tag to allTags object with a count of 1 */
        allTags[tag] = 1;
      } else {
        /* [NEW] increment the tag count in allTags */
        allTags[tag]++;
      }
    }
    /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    console.log(allTags);
    tagsWrapper.insertAdjacentHTML('beforeend', html);
  }
  /* END LOOP: for every article: */

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);

  /* [NEW] create a variable to hold the HTML of all tags */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams: ', tagsParams);
  let allTagsHTML = '';
  
  //dodane sortowanie od największej liczby wystąpień tagu do najmniejszej

  /* [NEW] Convert allTags object into an array of entries and sort it */
  const sortedTags = Object.entries(allTags).sort((a, b) => b[1] - a[1]); 
  // a[1] to liczba wystąpień dla tagu `a`, b[1] dla tagu `b`

  /* [NEW] for each tag in sortedTags array, generate the HTML and add it to allTagsHTML */
  for (let [tag, count] of sortedTags) {
    const tagLinkHTML = `<li><a href="#tag-${tag}" class="${optCloudClassPrefix}${calculateTagClass(count, tagsParams)}">${tag}</a></li>`;
    console.log('tagLinkHTML: ', tagLinkHTML);
    allTagsHTML += tagLinkHTML;
  }

  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTagsHTML;
}

generateTags();

function filterArticlesByTag(tag) {
    const allLinks = document.querySelectorAll('.titles a');
    
    for (let link of allLinks) {
        link.classList.remove('active');
    }

    const articlesWithTag = document.querySelectorAll('[data-tags~="' + tag + '"]');
    // Zaczynamy pokazywać tylko te artykuły w liście
    for (let article of articlesWithTag) {
        const articleId = article.getAttribute('id');
        const articleLink = document.querySelector('.titles a[href="#' + articleId + '"]');
        articleLink.classList.add('active');
    }
}

function tagClickHandler(event) {
    event.preventDefault();

    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.replace('#tag-', '');

    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    for (let activeTag of activeTags) {
        activeTag.classList.remove('active');
    }

    const tagLinks = document.querySelectorAll(`a[href="${href}"]`);

    for (let tag of tagLinks) {
        tag.classList.add('active');
    }

    filterArticlesByTag(tag);
}

function addClickListenersToTags() {
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
    for (const tagLink of tagLinks) {
        tagLink.addEventListener('click', tagClickHandler);
    }
}

addClickListenersToTags();

// Nowe funkcje do obsługi autorów:

function generateAuthors() {
  let allAuthors = {};

  const articles = document.querySelectorAll(optArticleSelector);

  for (const article of articles) {
      const authorName = article.getAttribute('data-author');
      const authorWrapper = article.querySelector('.post-author');
      authorWrapper.innerHTML = '';

      const authorHTML = `<a href="#author-${authorName}">${authorName}</a>`;
      authorWrapper.insertAdjacentHTML('beforeend', authorHTML);

      if (!allAuthors[authorName]) {
          allAuthors[authorName] = 1;
      } else {
          allAuthors[authorName]++;
      }
  }

  const authorsList = document.querySelector(optAuthorsListSelector);
  authorsList.innerHTML = '';

  const authorsParams = calculateTagsParams(allAuthors);
  console.log('authorsParams: ', authorsParams);

  let allAuthorsHTML = '';

  const sortedAuthors = Object.entries(allAuthors).sort((a, b) => b[1] - a[1]);

  for (let [author, count] of sortedAuthors) {
      const authorClass = `${optAuthorClassPrefix}${calculateTagClass(count, authorsParams)}`;
      const authorHTML = `<li><a href="#author-${author}" class="${authorClass}">${author}</a></li>`;
      console.log('authorHTML: ', authorHTML);
      allAuthorsHTML += authorHTML;
  }

  authorsList.innerHTML = allAuthorsHTML;
}

function filterArticlesByAuthor(author) {
  const allLinks = document.querySelectorAll('.titles a');

  for (let link of allLinks) {
      link.classList.remove('active');
  }

  const articlesWithAuthor = document.querySelectorAll(`[data-author="${author}"]`);

  for (let article of articlesWithAuthor) {
      const articleId = article.getAttribute('id');
      const articleLink = document.querySelector(`.titles a[href="#${articleId}"]`);
      articleLink.classList.add('active');
  }
}

function authorClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');

  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  for (let activeAuthor of activeAuthors) {
      activeAuthor.classList.remove('active');
  }

  const authorLinks = document.querySelectorAll(`a[href="${href}"]`);

  for (let authorLink of authorLinks) {
      authorLink.classList.add('active');
  }

  filterArticlesByAuthor(author);
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  for (const authorLink of authorLinks) {
      authorLink.addEventListener('click', authorClickHandler);
  }
}

// Wywołanie funkcji
generateAuthors();
addClickListenersToAuthors();