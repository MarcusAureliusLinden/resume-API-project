function userInformationHtml(user) {
    return `<h2>${user.name} <span class="small-name"></span> (@<a href="${user.html_url}" target="_blank">${user.login}</a> </h2>
    <div class="gh-content">
        <div class="gh-avatar"> <a href="${user.html_url} target="_blank">
        <img src="${user.avatar_url}" width="80 height="80">
        </a> </div>
        <p>Followers: ${user.followers} - Following: ${user.following} <br> Repos: ${user.public_repos}</p>
    </div>`;
}

function fetchGitHubInformation(event) {
    var username = $("#gh-username").val();
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
        return;
    }
    $("#gh-user-data").html(`<div id="loader">
    <img src="assets/loader.gif" />
    </div>`);

    $.when (
        $.getJSON(`https://api.github.com/users/${username}`)
    ).then(
        function(response) {
            var userData = response;
            $("#gh-user-data").html(userInformationHtml(userData));
        }, function(errorResponse) {
            if (errorResponse.status === 404) {
                $("#gh-user-data").html(`<h2>No info found</h2>`);
            } else {
                console.log(errorResponse);
                $("#gh-user-data").html(`<h2>Error ${errorResponse.responseJSON.message}</h2>`)
            }
        });
}