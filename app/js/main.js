'use strict';

/*
<li class="works-grid-item">
    <a href="#" title="Voir le projet Dashboard Unitag">
        <div class="works-grid-item-title">Dashboard Unitag</div>
        <div class="works-grid-item-company">Unitag</div>
        <hr>
        <div class="works-grid-item-more">Voir plus</div>
    </a>
</li>
*/


(function () {
    
    var projects = [];
    var domProjects = [];
    var pageContainer, projectViewer, projectsCloseButton;
    
    function createProjectDom (project) {
        var tempListElement, tempLinkElement, tempDomElement;

        tempListElement = document.createElement('li');
        tempListElement.className = 'works-grid-item';
        
        tempLinkElement = document.createElement('a');
        tempLinkElement.href = '#';
        tempLinkElement.title = 'Voir le projet ' + project.title;
        tempLinkElement.addEventListener('click', function (ev) {
            ev.preventDefault();
            showAProject(project);  
        }, false);
        tempLinkElement.addEventListener('keydown', function (ev) {
            ev.preventDefault();
            showAProject(project);  
        }, false);
    
        tempDomElement = document.createElement('div');
        tempDomElement.className = 'works-grid-item-title';
        tempDomElement.innerHTML = project.title;
        tempLinkElement.appendChild(tempDomElement);
        
        tempDomElement = document.createElement('div');
        tempDomElement.className = 'works-grid-item-company';
        tempDomElement.innerHTML = project.company;
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
            ev.preventDefault();
            closeProjectViewer();
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

    }
    
    function showAProject (project) {
        openProjectViewer();
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
