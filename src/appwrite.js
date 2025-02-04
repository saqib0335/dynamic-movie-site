import { Client, Databases, ID, Query} from 'appwrite'

const PROJECT_ID = import.meta.env.VITE_APPWRITE_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION;

const client = new Client()
   .setEndpoint('https://cloud.appwrite.io/v1')
   .setProject(PROJECT_ID);
   
const databases = new Databases(client);

export const updateSearch = async (searchParam, movie) => {
    // use appwrite sdk to check if the search term exist inthe data base
    try {
        const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchParam', searchParam)
        ])
        // if it does update the count
        if(result.documents.length > 0){
            const doc = result.documents[0]
            await databases.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id,
                { count: doc.count + 1,
})
      // if it doesnt creats a new document with the search term and count as 1 
        }else{
            await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchParam,
                 count: 1,
                 movie_id:movie.id,
                 poster_url:`https://image.tmdb.org/t/p/w500${movie.poster_path}`
            })
        }
    }catch(error){
          console.log(error)
    }
}
export const trandingMovie = async () => {
    try{
        const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count')
            ])
            return result.documents

    }catch(error){
        console.log(error)
    }
}