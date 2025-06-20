import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

///////////////// Registration ///////////////////////

export const registerUser = async (userData) => {
    try {
        return await axios.post(`${API_URL}/auth/register`, userData);
    } catch (error) {
        console.log("error registering", error)
    }
}

///////////////// Authorisation /////////////////////

export const loginUser = async (credentials) => {
    try {
        return await axios.post(`${API_URL}/auth/login`, credentials)
    } catch(error) {
        console.log("error logging in", error)
    }
    

}

///////////////////////// Posts /////////////////////

export const fetchAllPosts = async (page = 1, pageSize = 20, token = null) => {
    try {
        console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
        const headers = token
            ? { Authorization: `Bearer ${token}` }
            : {};

        return await axios.get(`${API_URL}/review/`, {
            params: { page, pageSize },
            headers,
        });
    } catch (error) {
        console.log("Error fetching posts", error);
    }
};

////////////////fetch single post////////////////
export const fetchPost = async ( postId, token = null) => {
    try {
        const headers = token
            ? { Authorization: `Bearer ${token}` }
            : {};

        return await axios.get(`${API_URL}/review/${postId}`, {
            headers,
        });
    } catch (error) {
        console.log("Error fetching post", error);
    }
};

//create new post, authorised users only
export const addReview = async (reviewObject, token = null) => {
    try {
        const headers = token
            ? { Authorization: `Bearer ${token}` }
            : {};
        return await axios.post(`${API_URL}/review`, reviewObject, {headers})

    } catch(error) {
        console.log("error adding review", error)

    }
}

//update own post, authorised only
export const editReview = async (postId, reviewObject, token = null) => {
    try {
        const headers = token
            ? { Authorization: `Bearer ${token}` }
            : {};
        return await axios.put(`${API_URL}/review/${postId}`,reviewObject, {headers})

    } catch(error) {
        console.log("error updating review", error)

    }
}

//add reaction, authorised users only
export const addReaction = async (reactionObject, token = null ) => {
    try {
        const headers = token
            ? { Authorization: `Bearer ${token}` }
            : {};

        return await axios.post(`${API_URL}/reaction`, reactionObject, {headers})
    } catch (error) {
        console.log("error adding reaction", error)
    }
}


//delete own post, authorised only
export const deleteReview = async (postId, token = null) => {
    try {
        const headers = token
            ? { Authorization: `Bearer ${token}` }
            : {};
        return await axios.delete(`${API_URL}/review/${postId}`, {headers})

    } catch(error) {
        console.log("error deleting review", error)

    }
}


////////////////////// User //////////////////////////
export const fetchProfile = async (token = null, userId = null, page = 1, pageSize = 20) => {
    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
  
      const response = await axios.get(`${API_URL}/profile`, {
        params: {
          ...(userId ? { id: userId } : {}),
          page,
          pageSize
        },
        headers,
      });
  
      return response;
    } catch (error) {
      console.log("Error fetching profile", error);
      throw error;
    }
  };
  
  
