import OpenAI from "openai";

const openai = new OpenAI({
    apiKey:import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});


const apiCall = async (board) => {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system",
         content: `the following is a 2D array fepresenting a gme of connect4, 
         which you are participating in.  you are player 2 and your 'pieces' are represented by 2 in the arrays.
           the aim is to create a line of 4 consecutive 'pieces', either horizontally, vertically or diagonally.
           pieces are entered from the top and rest in the lowest available slot, represented by a 0.  
           the other players pieces are represented by a 1.
           respond with only a number from 0 - 6 inclusive, representing the column you wish to deploy a piece.
           try to place pieces in columns where htey might be close to other pieces of yours, and make a 4 piece connection.
           a piece may only be placed in a column if there is a space, represented by 0.
           ${board}
        `
     }],
        model: "gpt-4o",
      });
      console.log(completion.choices[0].message.content)
      return(parseInt(completion.choices[0].message.content));

}

export default apiCall;