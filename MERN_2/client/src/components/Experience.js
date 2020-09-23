// import React from 'react';
// import { connect } from 'react-redux';
// import Moment from 'react-moment';
// import {
//   getCurrentProfile,
//   deleteExperience,
//   deleteEducation,
// } from '../actions/profile';

// const Experience = ({ profile: { profile, loading }, deleteExperience }) => {
//   // const exps = profile.experience;
//   if (profile.experience) {
//     return profile.experience.map((exp) => {
//       <h1>{exp.company}</h1>;
//     });
//   } else {
//     return <h1>hello</h1>;
//   }
//   // {
//   //   profile && profile.education ? (
//   //     profile.education.map((edu) => {
//   //       return (
//   //         <tr key={edu._id}>
//   //           <td>{edu.school}</td>
//   //           <td className='hide-sm'>{edu.fieldofstudy}</td>

//   //           <td>
//   //             <Moment format='DD/MM/YYYY'>{edu.from}</Moment> -
//   //             {edu.to === null ? (
//   //               ' Now'
//   //             ) : (
//   //               <Moment format='DD/MM/YYYY'>{edu.to}</Moment>
//   //             )}
//   //           </td>
//   //           <td>
//   //             <button
//   //               className='btn btn-danger'
//   //               onClick={() => deleteEducation(edu._id)}
//   //             >
//   //               Delete
//   //             </button>
//   //           </td>
//   //         </tr>
//   //       );
//   //     })
//   //   ) : (
//   //     <h1>Please add an education</h1>
//   //   );
//   // }
// };
// const mapStateToProps = (state) => ({
//   profile: state.profile,
// });
// export default connect(mapStateToProps, { deleteExperience })(Experience);
// {
//   /* <tr key={exp._id}>
// <td>{exp.school}</td>
// <td className='hide-sm'>{exp.fieldofstudy}</td>

// <td>
//   <Moment format='DD/MM/YYYY'>{exp.from}</Moment> -
//   {exp.to === null ? (
//     ' Now'
//   ) : (
//     <Moment format='DD/MM/YYYY'>{exp.to}</Moment>
//   )}
// </td>
// <td>
//   <button
//     className='btn btn-danger'
//     onClick={() => deleteExperience(exp._id)}
//   >
//     Delete
//   </button>
// </td>
// </tr> */
// }
