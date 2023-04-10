/* Lists Tteam*/

const containerTeams = document.querySelector('#containerTeams');

function htmlTeams(arrayTeams){
  let fragment = document.createDocumentFragment();
  let divTeam = document.createElement('div');
  divTeam.classList.add('row');
  arrayTeams.forEach(function(team){
    divTeam.innerHTML += 
    `
      <div class="col-xl-3 col-sm-6 mb-4 mb-md-3">
        <div class="bg-white rounded shadow-sm py-4 px-2">
          <img src="${team.img}" alt="${team.name}" 
            class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm imgTeam">
          <h5 class="mb-0">${team.name}</h5>
          <div class="p-3 text-start">
            <span class="text-justify">${team.descrip}</span>
          </div>
          <ul class="social mb-0 list-inline mt-3">
            <li class="list-inline-item">
              <a href="${team.github}" target="_blank" rel="noopener noreferrer" class="social-link">
                <i class="fa-brands fa-github"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a href="${team.linkedin}" target="_blank" rel="noopener noreferrer" class="social-link">
                <i class="fa-brands fa-linkedin"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    `;

    fragment.append(divTeam);
  });
  
  containerTeams.append(fragment);
}

let teams = teamsList;
htmlTeams(teams);

