let employeePayrollList;
window.addEventListener('DOMContentLoaded', () => {
    employeePayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
});

const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList') ? JSON.parse(localStorage.getItem('EmployeePayrollList')) : [];
}
const createInnerHtml = () => {

    // if(employeePayrollList.length == 0 ) return;

    const headerHtml = `<tr>
    <th></th>
    <th>Name</th>
    <th>Gender</th>
    <th>Department</th>
    <th>Salary</th>
    <th>Start Date</th>
    <th>Actions</th>
    </tr>`;



    let innerHtml = `${headerHtml}`;
    if (employeePayrollList.length == 0) {
        document.querySelector('#table-display').innerHTML = innerHtml;
        return;
    }
    for (const employeePayrollData of employeePayrollList) {
        innerHtml = `${innerHtml}
        <tr>
            <td><img class="profile" alt="" src="${employeePayrollData._profilePic}"></td>
            <td>${employeePayrollData._name}</td>
            <td>${employeePayrollData._gender}</td>
            <td>${getDeptHtml(employeePayrollData._department)}</td>
            <td>${employeePayrollData._salary}</td>
            <td>${formatDate(employeePayrollData._startDate)}</td>
            
            <td>
                <img id="${employeePayrollData._id}" onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="delete" >
                <img id="${employeePayrollData._id}" onclick="update(this)" src="../assets/icons/create-black-18dp.svg" alt="edit">
            </td>
    </tr>`;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
}

const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for (const dept of deptList) {
        deptHtml = `${deptHtml}<div class="dept-label">${dept}</div>`
    }
    return deptHtml;
}

// const stringifyDate = (Date) =>{
//     const options = {date:'numeric',month:'short',year:'numeric'};
//     const newDate = !Date ? "undefined" :
//     new Date (Date.parse(Date)).toLocaleDateString('en-IN',options);
//     return newDate;
// }


const remove = (node) => {
    let employeePayrollData = employeePayrollList.find(empDate => empDate._id == node._id);
    if (!employeePayrollData) return;
    const index = employeePayrollList
        .map(empDate => empDate._id)
        .indexOf(employeePayrollData._id);
    employeePayrollList.splice(index, 1);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();

}

const update = (node) => {
    let employeePayRollData = employeePayrollList.find(emp => emp._id == node.id);
    if (!employeePayRollData) return;
    localStorage.setItem('editEmp', JSON.stringify(employeePayRollData));
    window.location.replace("../pages/employeePayrollForm.html");
};