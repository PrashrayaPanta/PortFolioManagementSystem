import { http } from "@/http";

//! Skills
export const fetchSkills = () => {

    try {



    } catch (error) {




    }

}

export const createSkill = () => {
    try {



    } catch (error) {


    }

}

export const updateSkill = (slug: string) => {
    try {




    } catch (error) {



    }






}


//! About

export const getAbout = () => {
    try {


    } catch (error) {

        console.log(error);

    }


}


export const createAbout = ({ }) => {
    try {



    } catch (error) {

        console.log(error);



    }



}


export const updateAbout = (slug: string) => {
    try {



    } catch (error) {


    }


}



//! Experience
export const getExperience = () => {
    try {


    } catch (error) {



    }
}

export const createExperience = ({ }) => {
    try {


    } catch (error) {




    }
}

export const updateExperience = (slug: string) => {

    try {


    } catch (errror) {


        console.log();

    }




}


//! Education
export const getEducation = () => {
    try {


    } catch (error) {



    }



}


export const createEducation = ({ }) => {
    try {


    } catch (error) {

        console.log(error);

    }
}


export const updateEducation = () => {
    try {


    } catch (error) {


        console.log(error);

    }


}

//! Hero
export const getHero = () => {
    try {


    } catch (error) {

        console.log(error);

    }



}


export const createHero = ({ }) => {
    try {


    } catch (error) {


    }



}


export const updateHero = () => {
    try {



    } catch (error) {



    }


}


interface userLogin {
    email: string,
    password: string
}

//! user login
export const userLogin = async ({ email, password }: userLogin) => {
        const response = await http.post("/user/login", { email, password }, {
            withCredentials: true
        })

        return response
}



//! User Logout


export const userLogout = async() => {
    try {

        http.get("/user/logout", { withCredentials: true })
        
        

    } catch (error) {
        

    }


}

