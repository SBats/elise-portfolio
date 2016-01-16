'use strict';

(function () {
    
    var projects = [];
    var domProjects = [];
    var pageContainer, projectViewer, projectsCloseButton;
    
    function createProjectDom (project) {
        var tempListElement, tempLinkElement, tempDomElement;

        tempListElement = document.createElement('li');
        tempListElement.className = 'works-grid-item';
        
        tempDomElement = document.createElement('img');
        tempDomElement.className = 'works-grid-item-thumbnail';
        tempDomElement.src = project.thumbnail;
        tempDomElement.alt = project.title;
        tempListElement.appendChild(tempDomElement);
        
        tempLinkElement = document.createElement('a');
        tempLinkElement.href = '#';
        tempLinkElement.title = 'Voir le projet ' + project.title;
        tempLinkElement.addEventListener('click', function (ev) {
            ev.preventDefault();
            showAProject(project);  
        }, true);
        tempLinkElement.addEventListener('keydown', function (ev) {
            var pressedKey = ev.key || ev.keyCode || event.which;

            if (pressedKey == 13) {
                ev.preventDefault();
                showAProject(project);      
            }
        }, true);
        
        tempDomElement = document.createElement('div');
        tempDomElement.className = 'works-grid-item-type';
        tempDomElement.innerHTML = project.type;
        tempLinkElement.appendChild(tempDomElement);
    
        tempDomElement = document.createElement('div');
        tempDomElement.className = 'works-grid-item-title';
        tempDomElement.innerHTML = project.title;
        tempLinkElement.appendChild(tempDomElement);
        
        tempDomElement = document.createElement('hr');
        tempLinkElement.appendChild(tempDomElement);
        
        tempDomElement = document.createElement('div');
        tempDomElement.className = 'works-grid-item-more';
        tempDomElement.innerHTML = 'Voir plus';
        tempLinkElement.appendChild(tempDomElement);
    
        tempListElement.appendChild(tempLinkElement);
        
        return tempListElement;
    }
    
    function displayProjects () {
        var tempDomElement;
        var projectsContainer = document.querySelector('#works .works-grid');
        
        for (var i = 0; i < projects.length; i++) {
            tempDomElement = createProjectDom(projects[i]);
            domProjects.push(tempDomElement);
            projectsContainer.appendChild(tempDomElement);
        }
        
        projectsCloseButton.addEventListener('click', function (ev) {
            ev.preventDefault();
            closeProjectViewer();
        }, false);
        projectsCloseButton.addEventListener('keydown', function (ev) {
            var pressedKey = ev.key || ev.keyCode || event.which;

            if (pressedKey == 13) {
                ev.preventDefault();
                closeProjectViewer();    
            }
        }, false);
        
    }
    
    function getProjects () {
        var xhr = new XMLHttpRequest();   
        
        xhr.onreadystatechange = function(){
            
            if(xhr.status !== 200) {
                console.error('Couldn\'t get Projects json');
            }
            
            if(xhr.readyState === 1) {
                console.log('loading');   
            }
            
            if(xhr.readyState === 1) {
                console.log('loaded');   
            }
            
            if(xhr.readyState === 4) {
                projects = JSON.parse(xhr.responseText);
                displayProjects();
            }
            
        }
        
        xhr.open("GET", "http://elise-jaspard.fr/api/projects.json", true);
        xhr.send("");

    }
    
    function fillViewerWithProject(project, callback) {
        var tempListElement, tempDomeElement;
        emptyViewerWithProject();
        
        projectViewer.querySelector('.project-title').innerHTML = project.title;
        projectViewer.querySelector('.project-company').innerHTML = project.company;
        projectViewer.querySelector('.project-type').innerHTML = project.type;
        projectViewer.querySelector('.project-description').innerHTML = project.description;
        
        for (var i = 0; i < project.tags.length; i++) {
            tempListElement = document.createElement('li');
            tempListElement.innerHTML = project.tags[i];
            projectViewer.querySelector('.project-tags-list').appendChild(tempListElement);
        }
        
        if (project.link.url != '') {
            projectViewer.querySelector('.project-link').innerHTML = project.link.title;
            projectViewer.querySelector('.project-link').href = project.link.url;
        } else {
            if (!projectViewer.querySelector('.project-link').classList.contains('hidden')) {
                projectViewer.querySelector('.project-link').classList.add('hidden');
            }
        }
        
        projectViewer.querySelector('.project-link').title = project.link.title;
        
        for (var j = 0; j < project.images.length; j++) {
            tempDomeElement = document.createElement('img');
            tempDomeElement.src = project.images[j];
            tempDomeElement.alt = project.title + ': Illustration ' + j;
            
            tempListElement = document.createElement('li');
            tempListElement.className = 'card-shadow';
            tempListElement.appendChild(tempDomeElement);
            projectViewer.querySelector('.project-images-list').appendChild(tempListElement);
        }
        
        callback();
    }
    
    function emptyViewerWithProject() {
        projectViewer.querySelector('.project-title').innerHTML = '';
        projectViewer.querySelector('.project-company').innerHTML = '';
        projectViewer.querySelector('.project-type').innerHTML = '';
        projectViewer.querySelector('.project-tags-list').innerHTML = '';
        projectViewer.querySelector('.project-description').innerHTML = '';
        projectViewer.querySelector('.project-link').innerHTML = '';
        projectViewer.querySelector('.project-link').href = '#';
        projectViewer.querySelector('.project-link').title = '';
        
        if (projectViewer.querySelector('.project-link').classList.contains('hidden')) {
            projectViewer.querySelector('.project-link').classList.remove('hidden');
        }

        projectViewer.querySelector('.project-images-list').innerHTML = '';
    }
    
    function showAProject(project) {
        projectsCloseButton.focus();
        fillViewerWithProject(project, openProjectViewer);
    }
    
    function openProjectViewer () {
        var viewerClassList = projectViewer.classList;
        var pageContainerClassList = pageContainer.classList;
        
        if (!viewerClassList.contains('shown')) {
            projectViewer.classList.add('shown');
        }

        if (!pageContainerClassList.contains('no-scroll')) {
            pageContainerClassList.add('no-scroll');
        }

    }
    
    function closeProjectViewer () {
        var viewerClassList = projectViewer.classList;
        var pageContainerClassList = pageContainer.classList;
        
        if (viewerClassList.contains('shown')) {
            projectViewer.classList.remove('shown');
        }
        
        if (pageContainerClassList.contains('no-scroll')) {
            pageContainerClassList.remove('no-scroll');
        }
        
        emptyViewerWithProject();

    }

    function computeBackgroundOffset (element) {
        var scrollPosition = document.querySelector('body').scrollTop;
        element.style.backgroundPositionY = '-' + scrollPosition / 40 + 'px';
    }

    function mainController () {
        var backgroundElement = document.querySelector('.main-container');
        projectViewer = document.querySelector('#projects-viewer');
        projectsCloseButton = document.querySelector('#projects-viewer .project-back');
        pageContainer = document.querySelector('body');
        
        computeBackgroundOffset(backgroundElement);
        window.addEventListener("scroll", function () {
            computeBackgroundOffset(backgroundElement);
        });
        
        getProjects();
    }

    document.addEventListener("DOMContentLoaded", mainController);
    
})();
