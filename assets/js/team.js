/* Lists Tteam*/

const containerTeams = document.querySelector('#containerTeams');

function htmlTeams(arrayTeams){
  let fragment = document.createDocumentFragment();
  let divTeam = document.createElement('div');
  divTeam.classList.add('row');

  
  // divTeam.classList.add('col-xl-3');
  // divTeam.classList.add('col-sm-6');
  // divTeam.classList.add('mb-5');
  // divTeam.classList.add('bg-white');
  // divTeam.classList.add('rounded');
  // divTeam.classList.add('shadow-sm');
  // divTeam.classList.add('py-4');
  // divTeam.classList.add('px-2');

  arrayTeams.forEach(function(team){
    divTeam.innerHTML += 
    `
      <div class="col-xl-3 col-sm-6 mb-5">
        <div class="bg-white rounded shadow-sm py-4 px-2">
          <img src="${team.img}" alt="" width="150"
            class="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm">
          <h5 class="mb-0">${team.name}</h5>
          <ul class="social mb-0 list-inline mt-3">
            <li class="list-inline-item">
              <a href="${team.github}" class="social-link">
                <i class="fa-brands fa-github"></i>
              </a>
            </li>
            <li class="list-inline-item">
              <a href="${team.linkedin}" class="social-link">
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

