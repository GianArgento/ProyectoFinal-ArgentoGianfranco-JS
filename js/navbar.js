//Scroll 


$("#navHome").click(scrollHome);

function scrollHome() {
  $("html,body").animate(
    {
      scrollTop: $("#home").offset().top
    },
    1500
  )
}



$("#navService").click(scrollService);

function scrollService() {
  $("html,body").animate(
    {
      scrollTop: $("#service").offset().top
    },
    1500
  )
}

$("#navPortfolio").click(scrollPortfolio)

function scrollPortfolio() {
  $("html,body").animate(
    {
      scrollTop: $("#portfolio").offset().top
    },
    1500
  )
}

$("#navAbout").click(scrollAbout)

function scrollAbout() {
  $("html,body").animate(
    {
      scrollTop: $("#about").offset().top
    },
    1500
  )
}


$("#navTeam").click(scrollTeam)

function scrollTeam() {
  $("html,body").animate(
    {
      scrollTop: $("#team").offset().top
    },
    1500
  )
}
