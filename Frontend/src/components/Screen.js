import React from 'react';

import './Screen.css';

function Screen({ isTouched, booked,price, status, setStatus, setBookingNum,setPrice}) {
  const seatArr = [
   {
    A : [
      {
        seatNumber : 1,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 2,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 3,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 4,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 5,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 6,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 7,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 8,
        type : "normal",
        status:'active',
      }, {
        seatNumber : 9,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 10,
        type : "normal",
        status:'active',
      }
    ],
   },
   {
    B : [
      {
        seatNumber : 1,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 2,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 3,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 4,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 5,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 6,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 7,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 8,
        type : "normal",
        status:'active',
      }, {
        seatNumber : 9,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 10,
        type : "normal",
        status:'active',
      }
    ],
   },
   {
    C : [
      {
        seatNumber : 1,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 2,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 3,
        type : "Vip",
        status:'active',
      },
      {
        seatNumber : 4,
        type : "Vip",
        status:'active',
      },
      {
        seatNumber : 5,
        type : "Vip",
        status:'active',
      },
      {
        seatNumber : 6,
        type : "Vip",
        status:'active',
      },
      {
        seatNumber : 7,
        type : "Vip",
        status:'active',
      },
      {
        seatNumber : 8,
        type : "Vip",
        status:'active',
      }, {
        seatNumber : 9,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 10,
        type : "normal",
        status:'active',
      }
      ,
      {
        seatNumber : 11,
        type : "normal",
        status:'active',
      }
    ],
   },
   {
    D : [
      {
        seatNumber : 1,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 2,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 3,
        type : "Vip",
        status:'active',
      },
      {
        seatNumber : 4,
        type : "Vip",
        status:'active',
      },
      {
        seatNumber : 5,
        type : "Vip",
        status:'active',
      },
      {
        seatNumber : 6,
        type : "Vip",
        status:'active',
      },
      {
        seatNumber : 7,
        type : "Vip",
        status:'active',
      },
      {
        seatNumber : 8,
        type : "Vip",
        status:'active',
      }, {
        seatNumber : 9,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 10,
        type : "normal",
        status:'active',
      }
      ,
      {
        seatNumber : 11,
        type : "normal",
        status:'active',
      }
    ],
   },
   {
    E : [
      {
        seatNumber : 1,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 2,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 3,
        type : "Vip",
        status:'active',
      },
      {
        seatNumber : 4,
        type : "Vip",
        status:'active',
      },
      {
        seatNumber : 5,
        type : "Vip",
        status:'active',
      },
      {
        seatNumber : 6,
        type : "Vip",
        status:'active',
      },
      {
        seatNumber : 7,
        type : "Vip",
        status:'active',
      },
      {
        seatNumber : 8,
        type : "Vip",
        status:'active',
      }, {
        seatNumber : 9,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 10,
        type : "normal",
        status:'active',
      }
      ,
      {
        seatNumber : 11,
        type : "normal",
        status:'active',
      }
    ],
   },
   {
    F : [
      {
        seatNumber : 1,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 2,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 3,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 4,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 5,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 6,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 7,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 8,
        type : "normal",
        status:'active',
      }, {
        seatNumber : 9,
        type : "normal",
        status:'active',
      },
      {
        seatNumber : 10,
        type : "normal",
        status:'active',
      }
      ,
      {
        seatNumber : 11,
        type : "normal",
        status:'active',
      }
    ],
   },
   {
    G : [
      {
        seatNumber1 : 1,
        seatNumber2 : 2,
        type : "double Chair",
        status:'active',
      },
      {
        seatNumber1 : 3,
        seatNumber2 : 4,
        type : "double Chair",
        status:'active',
      },
      {
        seatNumber1 : 5,
        seatNumber2 : 6,
        type : "double Chair",
        status:'active',
      },
      {
        seatNumber1 : 7,
        seatNumber2 : 8,
        type : "double Chair",
        status:'active',
      },
      {
        seatNumber1 : 9,
        seatNumber2 : 10,
        type : "double Chair",
        status:'active',
      },
    ],
   },
  ]
  const priceTicket = {
    "Vip":100000,
    "normal":65000,
    "double Chair":150000
  }
  const onGetValue = (seat,type) => {
      if (status.includes(seat)) {
        price -= priceTicket[type]
        const a1 = status.slice(0, status.indexOf(seat));
        const a2 = status.slice(status.indexOf(seat) + 1, status.length);
        let new_arr = a1.concat(a2);
        setBookingNum((prevState) => prevState - 1);
        setStatus(new_arr);
        setPrice(price)
      } else {
        price += priceTicket[type];
        setBookingNum((prevState) => prevState + 1);
        setStatus([...status, seat]);
        setPrice(price)
      }
  };
  return (
    <div className='screen'>
      <h2>Màn hình</h2>
      <table className='table-seat'>
        <tbody>
          {seatArr.map((ele,idx)=> (
            <tr key={idx}>
            <td>
              <p>{Object.keys(ele)[0]}</p>
            </td>
            <td>
            </td>
            {ele[Object.keys(ele)[0]].map((seat,ide)=>{
              if(seat.type === 'double Chair'){
                  let seatTitle = seat.seatNumber1+'-'+seat.seatNumber2
                  let arr = []
                  arr.push(
                    <td key={1}>
                    <p
                      className={
                        (seat.status === "booked" || booked.includes(Object.keys(ele)[0] + seatTitle))
                          ? 'disable'
                          : status.includes(Object.keys(ele)[0] + seatTitle)
                          ? 'selected'
                          : 'double'
                      }
                      onClick={()=>onGetValue(Object.keys(ele)[0] + seatTitle,seat.type)}
                    >
                      {seatTitle}
                    </p>
                </td>
                  )
                  arr.push(<td style={{cursor:"default"}} key={2}></td>)
                  return arr.map((ele,idx)=> (
                    ele
                  ))
                }
                else if(seat.type === 'Vip'){
                  return <td>
                    <p
                      className={
                        (seat.status === "booked"||booked.includes(Object.keys(ele)[0]+seat.seatNumber))
                          ? 'disable'
                          : status.includes(Object.keys(ele)[0]+seat.seatNumber)
                          ? 'selected'
                          : 'vip'
                      }
                      onClick={()=>onGetValue(Object.keys(ele)[0]+seat.seatNumber,seat.type)}
                    >
                      {seat.seatNumber}
                    </p>
                  </td>
                }
                else{
                  return <td>
                    <p
                      className={
                        (seat.status === "booked"||booked.includes(Object.keys(ele)[0]+seat.seatNumber))
                          ? 'disable'
                          : status.includes(Object.keys(ele)[0]+seat.seatNumber)
                          ? 'selected'
                          : ''
                      }
                      onClick={()=>onGetValue(Object.keys(ele)[0]+seat.seatNumber,seat.type)}
                    >
                      {seat.seatNumber}
                    </p>
                  </td>
                }
            } )}
          </tr>
          ))}
        </tbody>
      </table>
      <div className='note'>
        <div>
          <p><span className='rectager normal'></span>  Ghế thường</p>
        </div>
        <div>
          <p><span className='rectager double'></span>  Ghế đôi</p>
        </div>
        <div>
          <p><span className='rectager vip'></span>  Ghế Vip</p>
        </div>
        <div>
          <p><span className='rectager selected'></span>  Ghế đang chọn</p>
        </div>
        <div>
          <p><span className='rectager sold'></span>  Ghế đã đặt</p>
        </div>
      </div>
    </div>
  );
}

export default Screen;
