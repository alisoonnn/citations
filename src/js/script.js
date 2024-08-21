if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('js/service-worker.min.js').then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }


//   btn installer
  
  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt fired:', e);
    e.preventDefault();
    deferredPrompt = e;
    showInstallPromotion();
  });
  
  function showInstallPromotion() {
    // Détecter si l'utilisateur est sur un iPhone
    const isiPhone = /iPhone/.test(navigator.userAgent);
  
    // Détecter si l'utilisateur est sur un appareil Android
    const isAndroid = /Android/.test(navigator.userAgent);
  
    // Sélectionner votre bouton
    const installButton = $('.install');
  
    // Appliquer la logique d'affichage en fonction du dispositif
    if (isiPhone) {
      // Cacher le bouton sur iPhone
      installButton.hide();
    } else if (isAndroid) {
      // Afficher le bouton sur Android
      installButton.show();
    }

    deferredPrompt.prompt();
  }
  $(document).ready(function() {
    // Function to get a random citation and display it
    function getRandomCitation() {
        $('#loadingIndicator').show(); 
      $.ajax({
        url: 'https://sheets.googleapis.com/v4/spreadsheets/1kzXMsf47UPkADCoivqfrWK6fwzMR0pGNGhNWjBscz4E/values/citations?alt=json&key=AIzaSyCIrBFltp0hnK-pXW-Fj0uW8DWnnSysnE8',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            
            var values = data.values.slice(1); // Skip the first row (header row)
            var randomIndex = Math.floor(Math.random() * values.length);
            var citation = values[randomIndex][0]; // Citation
            var author = values[randomIndex][1]; // Author
            var description = values[randomIndex][2]; // Description
            var imageUrl = values[randomIndex][3]; // Image URL
  
          // Display the citation, author, description, and image URL
          $("h2").html(citation);
          $("p.author").html(author);
          $("p.description").html(description);
          $("img").attr("src", imageUrl);
        },
        complete: function() {
            $('#loadingIndicator').hide(); // Hide the loading indicator
          }
      });
    }
  
    // Call the function when the page is loaded
    getRandomCitation();
  
    // Call the function when the button is clicked
    $('.click-button').on('click', function() {
      getRandomCitation();
    });
  });