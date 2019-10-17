import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";


const OnBoardForm = ({values,errors,touched,status}) => {
   // console.log("The props are in the OnBoardFunction",props);
   const [users, setUsers] = useState([]);
   useEffect(() => {
      status && setUsers(users => [...users, status]);
    }, [status]);


   return (
      <div className="user-onBoarding-form">
         <h1>User Onboarding Form</h1>
         <Form>
            <label>
               Name
               <Field type="text" name="name" placeholder="Name" className="textInput"/>
               {touched.name && errors.name && (<p className="error">{errors.name}</p>)}
            </label>

            <label>
               Email
               <Field type="text" name="email" placeholder="Email" className="textInput"/>
               {touched.email && errors.email && (<p className="error">{errors.email}</p>)}
            </label>

            <label>
               Password
               <Field type="password" name="passwd" placeholder="Password" className="textInput"/>
               {touched.passwd && errors.passwd && (<p className="error">{errors.passwd}</p>)}
            </label>
            
            <label className="checkbox-container">
               Terms of Service
               <Field
                  type="checkbox"
                  name="tos"
                  // checked={values.tos}
               />
            </label>

            <button type="submit">Submit!</button>
         </Form>

         <div className="userContainer">
            {users.map(user => (
               <div key={user.email} className="userInfo">
                  <p>Name: {user.name}</p>
                  <p>Email: {user.email}</p>
                  <p>Password: {user.passwd}</p>
                  <p>Terms of Service acknowledged: {user.tos?"yes":"no"}</p>
               </div>
            ))}
         </div>
         
      </div>

   )

} //End of OnBoardForm function



const FormikOnBForm = withFormik({
   mapPropsToValues({ name, email, passwd, tos }) {
      return {
        tos: tos || false,
        name: name || "",
        email: email || "",
        passwd: passwd || ""
      };
   },

   validationSchema: Yup.object().shape({
   name: Yup.string().required("Please input name").max(10,"Max of 10 char"),
   email: Yup.string().required("Please input email").email("Please enter a valid email"),
   passwd: Yup.string().required("Please input password").min(4,"Min of 4 chars"),
   // tos: Yup.boolean()
   }),

   handleSubmit(values, { setStatus, resetForm }) {
      resetForm();

      axios
        // values is our object with all our data on it.
        .post("https://reqres.in/api/users/", values)
        .then(response => {
         console.log(response);
         setStatus(response.data);
        })
        .catch(err => console.log(err.response));
    }
   
 })(OnBoardForm); 
 
 export default FormikOnBForm;