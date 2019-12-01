let container = $(".container");
let apiInfo = {};

let filteredInformation = {};

let directors = {};
let producers = {};
let years = {};

$(function () {
    $('#filter-year').on("change", function() {
        $('#filter-director').find('option#default').prop({selected: true});
        $('#filter-producer').find('option#default').prop({selected: true});
        filterYear($('#filter-year :selected').attr("id"));
    });

    $('#filter-producer').on("change", function() {
        $('#filter-year').find('option#default').prop({selected: true});
        $('#filter-director').find('option#default').prop({selected: true});
        filterProducer($('#filter-producer :selected').attr("id"));
    });

    $('#filter-director').on("change", function() {
        $('#filter-year').find('option#default').prop({selected: true});
        $('#filter-producer').find('option#default').prop({selected: true});
        filterDirector($('#filter-director :selected').attr("id"));
    });

    $.ajax({
            method: "GET",
            url: "https://ghibliapi.herokuapp.com/films",
            async: false
    }).done(function (responce) {
        responce.forEach(movie => {
            apiInfo[movie.id] = movie;
        });
    });         

    drawInfo(apiInfo);
    addFilterOptions();
    clickEvet();
});

function filterProducer(value)
{
    filteredInformation = {}
    for (const key in apiInfo) {
        if (apiInfo[key].producer == value) {
            filteredInformation[key] = apiInfo[key];
        }
    }

    $('.main-container .card').remove();
    drawInfo(filteredInformation);
    clickEvet();
}

function filterDirector(value)
{
    filteredInformation = {}
    for (const key in apiInfo) {
        if (apiInfo[key].director == value) {
            filteredInformation[key] = apiInfo[key];
        }
    }

    $('.main-container .card').remove();
    drawInfo(filteredInformation);
    clickEvet();
}

function filterYear(value)
{
    filteredInformation = {}
    for (const key in apiInfo) {
        if (apiInfo[key].release_date == value) {
            filteredInformation[key] = apiInfo[key];
        }
    }

    $('.main-container .card').remove();
    drawInfo(filteredInformation);
    clickEvet();
}

function addFilterOptions()
{
    let divYearOptions = $('#filter-year');
    let divProducerOptions = $('#filter-producer');
    let divDirectorOptions = $('#filter-director');

    for (const key in directors) {
        divDirectorOptions.append('<option id="'+key+'">' + key +  '</option>');
    }

    for (const key in producers) {
        divProducerOptions.append('<option id="'+key+'">' + key +  '</option>');
    }

    for (const key in years) {
        divYearOptions.append('<option id="'+key+'">' + key +  '</option>');
    }
}

function drawInfo(information) 
{
    for (let info in information) {

        fillFilterOptions(directors, information[info].director);
        fillFilterOptions(producers, information[info].producer);
        fillFilterOptions(years, information[info].release_date);
        console.log(apiInfo[info].title);

        let card = document.createElement('div');
        card.setAttribute('class', 'card');

        let divTitle = document.createElement('div');
        divTitle.setAttribute('class', 'row');

        let h1 = document.createElement('h1');
        h1.textContent = apiInfo[info].title;

        let label = document.createElement("label");
        label.innerHTML = 'Show Description';
        label.setAttribute('for',  information[info].id);
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("id", information[info].id)
        checkbox.setAttribute('class', 'show-info');

       
        divTitle.append(h1);
        divTitle.append(checkbox);
        divTitle.append(label);

        let divMovieInfo = document.createElement('div');
        divMovieInfo.setAttribute('class', 'movie-info row');

        let producerP = document.createElement('p');
        producerP.innerHTML = 'Producer: ' + information[info].producer;
        let directorP = document.createElement('p');
        directorP.innerHTML = 'Director: ' + information[info].director;
        let yearP = document.createElement('p');
        yearP.innerHTML = 'Release Date: ' + information[info].release_date;

        let descriptionDiv = document.createElement('div');
        descriptionDiv.setAttribute('class', 'row description')
        let span = document.createElement('span');
        span.innerHTML = 'Discription: ' + information[info].description;
    
        divMovieInfo.append(producerP);
        divMovieInfo.append(directorP);
        divMovieInfo.append(yearP);
        descriptionDiv.append(span);

        card.append(divTitle);
        card.append(divMovieInfo);
        card.append(descriptionDiv);

        container.find("div.main-container").append(card);  
    }


}

function fillFilterOptions(object, value) 
{
    if (object[value] === undefined) {
        object[value] = value;
    }
}

function showDescription(event) 
{
    let clickedCheckbox = $(event.target);
    if (clickedCheckbox.is(':checked')) {
        clickedCheckbox.parents('div .card').find('div.description').show();
    } else {
        clickedCheckbox.parents('div .card').find('div.description').hide();
    }
}

function clickEvet() 
{
    $('.show-info').on("click", function(event) {
        showDescription(event);
    });
}