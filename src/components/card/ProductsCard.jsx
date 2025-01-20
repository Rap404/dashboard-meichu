import React from "react";

const ProductsCard = () => {
  return (
    <>
      <div className="flex flex-col gap-5 bg-secondary w-full h-96 py-5">
        <div className="flex w-full items-center justify-center">
          <span className="text-lg text-white">Best Products</span>
        </div>
        <div className="flex flex-col gap-5 py-2 px-2 my-5 mx-5 text-white bg-abutua">
          <table>
            <thead>
              <th>no</th>
              <th>name</th>
              <th>likes</th>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>nama product</td>
                <td>
                  <div className="flex gap-2 items-center">
                    1
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>nama product</td>
                <td>
                  <div className="flex gap-2 items-center">
                    1
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>nama product</td>
                <td>
                  <div className="flex gap-2 items-center">
                    1
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductsCard;
