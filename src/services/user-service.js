export const userService = {
    setActiveMember,
    getActiveMember,
  }

async function setActiveMember(member){
    let activeMember = JSON.stringify(member)
    sessionStorage.setItem('activeUser', activeMember)
    return member
}

async function getActiveMember(){
    let activeMember = JSON.parse(sessionStorage.getItem('activeUser'))
    if (!activeMember) return ({
        id: "m101",
        name: "Shiran Abir",
        email: "shiran@gmail.com",
        isAdmin: false,
        joinedAt: 1658291514565,
        lastSeen: 1658291514565,
        imgUrl: "https://ca.slack-edge.com/T035GULFZRD-U038455HGEP-5bb9017045d1-512",
        color: "#f5f5f5"
    })
    return activeMember
}