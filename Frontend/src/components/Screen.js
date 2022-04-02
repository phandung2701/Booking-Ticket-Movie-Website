import React from 'react';

import './Screen.css';

let bookingSeatNum = 0;

function Screen({ isTouched, booked, status, setStatus, setBookingNum }) {
  const onGetValue = (e, a) => {
    const seat = a + e.target.innerHTML;
    if (seat.length < 3) {
      if (!isTouched || booked.includes(a + e.target.innerHTML)) {
        return;
      }

      if (status.includes(seat)) {
        bookingSeatNum--;
        const a1 = status.slice(0, status.indexOf(seat));
        const a2 = status.slice(status.indexOf(seat) + 1, status.length);
        let new_arr = a1.concat(a2);
        setBookingNum((prevState) => prevState - 1);
        setStatus(new_arr);
      } else {
        // if (bookingSeatNum === 1) {
        //   return;
        // }
        bookingSeatNum++;
        setBookingNum((prevState) => prevState + 1);
        setStatus([...status, seat]);
      }
    }
  };
  return (
    <div className='screen'>
      <h2>Chỗ ngồi</h2>
      <table className='table-seat'>
        <tbody>
          <tr onClick={(e) => onGetValue(e, 'A')}>
            <td>
              <p>A</p>
            </td>
            <td></td>

            <td></td>
            <td></td>
            <td>
              <p
                className={
                  booked.includes('A1')
                    ? 'disable'
                    : status.includes('A1')
                    ? 'selected'
                    : ''
                }
              >
                1
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('A2')
                    ? 'disable'
                    : status.includes('A2')
                    ? 'selected'
                    : ''
                }
              >
                2
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('A3')
                    ? 'disable'
                    : status.includes('A3')
                    ? 'selected'
                    : ''
                }
              >
                3
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('A4')
                    ? 'disable'
                    : status.includes('A4')
                    ? 'selected'
                    : ''
                }
              >
                4
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('A5')
                    ? 'disable'
                    : status.includes('A5')
                    ? 'selected'
                    : ''
                }
              >
                5
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('A6')
                    ? 'disable'
                    : status.includes('A6')
                    ? 'selected'
                    : ''
                }
              >
                6
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('A7')
                    ? 'disable'
                    : status.includes('A7')
                    ? 'selected'
                    : ''
                }
              >
                7
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('A8')
                    ? 'disable'
                    : status.includes('A8')
                    ? 'selected'
                    : ''
                }
              >
                8
              </p>
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr onClick={(e) => onGetValue(e, 'B')}>
            <td>
              <p>B</p>
            </td>
            <td></td>

            <td></td>
            <td>
              <p
                className={
                  booked.includes('B1')
                    ? 'disable'
                    : status.includes('B1')
                    ? 'selected'
                    : ''
                }
              >
                1
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('B2')
                    ? 'disable'
                    : status.includes('B2')
                    ? 'selected'
                    : ''
                }
              >
                2
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('B3')
                    ? 'disable'
                    : status.includes('B3')
                    ? 'selected'
                    : ''
                }
              >
                3
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('B4')
                    ? 'disable'
                    : status.includes('B4')
                    ? 'selected'
                    : ''
                }
              >
                4
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('B5')
                    ? 'disable'
                    : status.includes('B5')
                    ? 'selected'
                    : ''
                }
              >
                5
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('B6')
                    ? 'disable'
                    : status.includes('B6')
                    ? 'selected'
                    : ''
                }
              >
                6
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('B7')
                    ? 'disable'
                    : status.includes('B7')
                    ? 'selected'
                    : ''
                }
              >
                7
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('B8')
                    ? 'disable'
                    : status.includes('B8')
                    ? 'selected'
                    : ''
                }
              >
                8
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('B9')
                    ? 'disable'
                    : status.includes('B9')
                    ? 'selected'
                    : ''
                }
              >
                9
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('B10')
                    ? 'disable'
                    : status.includes('B10')
                    ? 'selected'
                    : ''
                }
              >
                10
              </p>
            </td>
            <td></td>
          </tr>
          <tr onClick={(e) => onGetValue(e, 'C')}>
            <td>
              <p>C</p>
            </td>
            <td></td>

            <td>
              <p
                className={
                  booked.includes('C1')
                    ? 'disable'
                    : status.includes('C1')
                    ? 'selected'
                    : ''
                }
              >
                1
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('C2')
                    ? 'disable'
                    : status.includes('C2')
                    ? 'selected'
                    : ''
                }
              >
                2
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('C3')
                    ? 'disable'
                    : status.includes('C3')
                    ? 'selected'
                    : ''
                }
              >
                3
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('C4')
                    ? 'disable'
                    : status.includes('C4')
                    ? 'selected'
                    : ''
                }
              >
                4
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('C5')
                    ? 'disable'
                    : status.includes('C5')
                    ? 'selected'
                    : ''
                }
              >
                5
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('C6')
                    ? 'disable'
                    : status.includes('C6')
                    ? 'selected'
                    : ''
                }
              >
                6
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('C7')
                    ? 'disable'
                    : status.includes('C7')
                    ? 'selected'
                    : ''
                }
              >
                7
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('C8')
                    ? 'disable'
                    : status.includes('C8')
                    ? 'selected'
                    : ''
                }
              >
                8
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('C9')
                    ? 'disable'
                    : status.includes('C9')
                    ? 'selected'
                    : ''
                }
              >
                9
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('C10')
                    ? 'disable'
                    : status.includes('C10')
                    ? 'selected'
                    : ''
                }
              >
                10
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('C11')
                    ? 'disable'
                    : status.includes('C11')
                    ? 'selected'
                    : ''
                }
              >
                11
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('C12')
                    ? 'disable'
                    : status.includes('C12')
                    ? 'selected'
                    : ''
                }
              >
                12
              </p>
            </td>
          </tr>
          <tr onClick={(e) => onGetValue(e, 'D')}>
            <td>
              <p>D</p>
            </td>
            <td></td>

            <td>
              <p
                className={
                  booked.includes('D1')
                    ? 'disable'
                    : status.includes('D1')
                    ? 'selected'
                    : ''
                }
              >
                1
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('D2')
                    ? 'disable'
                    : status.includes('D2')
                    ? 'selected'
                    : ''
                }
              >
                2
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('D3')
                    ? 'disable'
                    : status.includes('D3')
                    ? 'selected'
                    : ''
                }
              >
                3
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('D4')
                    ? 'disable'
                    : status.includes('D4')
                    ? 'selected'
                    : ''
                }
              >
                4
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('D5')
                    ? 'disable'
                    : status.includes('D5')
                    ? 'selected'
                    : ''
                }
              >
                5
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('D6')
                    ? 'disable'
                    : status.includes('D6')
                    ? 'selected'
                    : ''
                }
              >
                6
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('D7')
                    ? 'disable'
                    : status.includes('D7')
                    ? 'selected'
                    : ''
                }
              >
                7
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('D8')
                    ? 'disable'
                    : status.includes('D8')
                    ? 'selected'
                    : ''
                }
              >
                8
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('D9')
                    ? 'disable'
                    : status.includes('D9')
                    ? 'selected'
                    : ''
                }
              >
                9
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('D10')
                    ? 'disable'
                    : status.includes('D10')
                    ? 'selected'
                    : ''
                }
              >
                10
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('D11')
                    ? 'disable'
                    : status.includes('D11')
                    ? 'selected'
                    : ''
                }
              >
                11
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('D12')
                    ? 'disable'
                    : status.includes('D12')
                    ? 'selected'
                    : ''
                }
              >
                12
              </p>
            </td>
          </tr>
          <tr onClick={(e) => onGetValue(e, 'E')}>
            <td>
              <p>E</p>
            </td>
            <td></td>

            <td>
              <p
                className={
                  booked.includes('E1')
                    ? 'disable'
                    : status.includes('E1')
                    ? 'selected'
                    : ''
                }
              >
                1
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('E2')
                    ? 'disable'
                    : status.includes('E2')
                    ? 'selected'
                    : ''
                }
              >
                2
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('E3')
                    ? 'disable'
                    : status.includes('E3')
                    ? 'selected'
                    : ''
                }
              >
                3
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('E4')
                    ? 'disable'
                    : status.includes('E4')
                    ? 'selected'
                    : ''
                }
              >
                4
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('E5')
                    ? 'disable'
                    : status.includes('E5')
                    ? 'selected'
                    : ''
                }
              >
                5
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('E6')
                    ? 'disable'
                    : status.includes('E6')
                    ? 'selected'
                    : ''
                }
              >
                6
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('E7')
                    ? 'disable'
                    : status.includes('E7')
                    ? 'selected'
                    : ''
                }
              >
                7
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('E8')
                    ? 'disable'
                    : status.includes('E8')
                    ? 'selected'
                    : ''
                }
              >
                8
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('E9')
                    ? 'disable'
                    : status.includes('E9')
                    ? 'selected'
                    : ''
                }
              >
                9
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('E10')
                    ? 'disable'
                    : status.includes('E10')
                    ? 'selected'
                    : ''
                }
              >
                10
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('E11')
                    ? 'disable'
                    : status.includes('E11')
                    ? 'selected'
                    : ''
                }
              >
                11
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('E12')
                    ? 'disable'
                    : status.includes('E12')
                    ? 'selected'
                    : ''
                }
              >
                12
              </p>
            </td>
          </tr>
          <tr onClick={(e) => onGetValue(e, 'F')}>
            <td>
              <p>F</p>
            </td>
            <td></td>

            <td>
              <p
                className={
                  booked.includes('F1')
                    ? 'disable'
                    : status.includes('F1')
                    ? 'selected'
                    : ''
                }
              >
                1
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('F2')
                    ? 'disable'
                    : status.includes('F2')
                    ? 'selected'
                    : ''
                }
              >
                2
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('F3')
                    ? 'disable'
                    : status.includes('F3')
                    ? 'selected'
                    : ''
                }
              >
                3
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('F4')
                    ? 'disable'
                    : status.includes('F4')
                    ? 'selected'
                    : ''
                }
              >
                4
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('F5')
                    ? 'disable'
                    : status.includes('F5')
                    ? 'selected'
                    : ''
                }
              >
                5
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('F6')
                    ? 'disable'
                    : status.includes('F6')
                    ? 'selected'
                    : ''
                }
              >
                6
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('F7')
                    ? 'disable'
                    : status.includes('F7')
                    ? 'selected'
                    : ''
                }
              >
                7
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('F8')
                    ? 'disable'
                    : status.includes('F8')
                    ? 'selected'
                    : ''
                }
              >
                8
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('F9')
                    ? 'disable'
                    : status.includes('F9')
                    ? 'selected'
                    : ''
                }
              >
                9
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('F10')
                    ? 'disable'
                    : status.includes('F10')
                    ? 'selected'
                    : ''
                }
              >
                10
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('F11')
                    ? 'disable'
                    : status.includes('F11')
                    ? 'selected'
                    : ''
                }
              >
                11
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('F12')
                    ? 'disable'
                    : status.includes('F12')
                    ? 'selected'
                    : ''
                }
              >
                12
              </p>
            </td>
          </tr>
          <tr onClick={(e) => onGetValue(e, 'G')}>
            <td>
              <p>G</p>
            </td>
            <td></td>

            <td>
              <p
                className={
                  booked.includes('G1')
                    ? 'disable'
                    : status.includes('G1')
                    ? 'selected'
                    : ''
                }
              >
                1
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('G2')
                    ? 'disable'
                    : status.includes('G2')
                    ? 'selected'
                    : ''
                }
              >
                2
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('G3')
                    ? 'disable'
                    : status.includes('G3')
                    ? 'selected'
                    : ''
                }
              >
                3
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('G4')
                    ? 'disable'
                    : status.includes('G4')
                    ? 'selected'
                    : ''
                }
              >
                4
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('G5')
                    ? 'disable'
                    : status.includes('G5')
                    ? 'selected'
                    : ''
                }
              >
                5
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('G6')
                    ? 'disable'
                    : status.includes('G6')
                    ? 'selected'
                    : ''
                }
              >
                6
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('G7')
                    ? 'disable'
                    : status.includes('G7')
                    ? 'selected'
                    : ''
                }
              >
                7
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('G8')
                    ? 'disable'
                    : status.includes('G8')
                    ? 'selected'
                    : ''
                }
              >
                8
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('G9')
                    ? 'disable'
                    : status.includes('G9')
                    ? 'selected'
                    : ''
                }
              >
                9
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('G10')
                    ? 'disable'
                    : status.includes('G10')
                    ? 'selected'
                    : ''
                }
              >
                10
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('G11')
                    ? 'disable'
                    : status.includes('G11')
                    ? 'selected'
                    : ''
                }
              >
                11
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('G12')
                    ? 'disable'
                    : status.includes('G12')
                    ? 'selected'
                    : ''
                }
              >
                12
              </p>
            </td>
          </tr>
          <tr onClick={(e) => onGetValue(e, 'H')}>
            <td>
              <p>H</p>
            </td>
            <td></td>

            <td>
              <p
                className={
                  booked.includes('H1')
                    ? 'disable'
                    : status.includes('H1')
                    ? 'selected'
                    : ''
                }
              >
                1
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('H2')
                    ? 'disable'
                    : status.includes('H2')
                    ? 'selected'
                    : ''
                }
              >
                2
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('H3')
                    ? 'disable'
                    : status.includes('H3')
                    ? 'selected'
                    : ''
                }
              >
                3
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('H4')
                    ? 'disable'
                    : status.includes('H4')
                    ? 'selected'
                    : ''
                }
              >
                4
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('H5')
                    ? 'disable'
                    : status.includes('H5')
                    ? 'selected'
                    : ''
                }
              >
                5
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('H6')
                    ? 'disable'
                    : status.includes('H6')
                    ? 'selected'
                    : ''
                }
              >
                6
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('H7')
                    ? 'disable'
                    : status.includes('H7')
                    ? 'selected'
                    : ''
                }
              >
                7
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('H8')
                    ? 'disable'
                    : status.includes('H8')
                    ? 'selected'
                    : ''
                }
              >
                8
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('H9')
                    ? 'disable'
                    : status.includes('H9')
                    ? 'selected'
                    : ''
                }
              >
                9
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('H10')
                    ? 'disable'
                    : status.includes('H10')
                    ? 'selected'
                    : ''
                }
              >
                10
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('H11')
                    ? 'disable'
                    : status.includes('H11')
                    ? 'selected'
                    : ''
                }
              >
                11
              </p>
            </td>
            <td>
              <p
                className={
                  booked.includes('H12')
                    ? 'disable'
                    : status.includes('H12')
                    ? 'selected'
                    : ''
                }
              >
                12
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Screen;
