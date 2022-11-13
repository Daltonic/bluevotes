import React from 'react'

const Polls = () => {
  return (
    <div className='pt-10'>
       <div className='grid grid-cols-1 gap-3 w-4/5 mx-auto md:grid-cols-3'>
            <div class="flex justify-center">
        <div class="rounded-lg shadow-lg bg-white max-w-sm">
            <a href="#!">
            <img class="rounded-t-lg" src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt=""/>
            </a>
            <div class="p-6">
            <h5 class="text-gray-900 text-xl font-medium mb-2">Pageantry</h5>
            <p class="text-gray-700 text-base mb-4">
            Enter to vote for your favorite contestant in the Pageantry award category
            </p>
            <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Enter</button>
            </div>
        </div>
                </div>



                <div class="flex justify-center">
             <div class="rounded-lg shadow-lg bg-white max-w-sm">
            <a href="#!">
            <img class="rounded-t-lg" src="https://images.unsplash.com/photo-1495995424756-6a5a3f9e7543?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80" alt=""/>
            </a>
            <div class="p-6">
            <h5 class="text-gray-900 text-xl font-medium mb-2">Best Student</h5>
            <p class="text-gray-700 text-base mb-4">
            Enter to vote for your favorite contestant in the Best Student award category
            </p>
            <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Enter</button>
            </div>
        </div>
                </div>


                <div class="flex justify-center">
        <div class="rounded-lg shadow-lg bg-white max-w-sm">
            <a href="#!">
            <img class="rounded-t-lg" src="https://images.unsplash.com/photo-1492462543947-040389c4a66c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" alt=""/>
            </a>
            <div class="p-6">
            <h5 class="text-gray-900 text-xl font-medium mb-2">Most Popular</h5>
            <p class="text-gray-700 text-base mb-4">
                Enter to vote for your favorite contestant in the Most Popular award category
            </p>
            <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Enter</button>
            </div>
        </div>
                </div>

    
       </div>
       <div className=' flex justify-center mt-20'>
       <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Load More</button>
       </div>

    </div>
  )
}

export default Polls