
import * as React from 'react';
import { WeatherViewModel } from '../../../view-models/horoscope-view-model';
import { LocalesNames } from '../../../locales-names';
import { PlaceHelper } from '../../../data/places/place-helper';

export default class Widget2Config extends React.Component<WeatherViewModel> {
    render() {
        const { __, capital: place, lang } = this.props;

        return (
            <div>
                <table className='o-table o-table--tiny'>
                    <tbody>
                        <tr>
                            <th>{__(LocalesNames.place)}</th>
                            <td>
                                <input type='text' className='c-wconfig__place' defaultValue={PlaceHelper.getName(place, lang)} />
                                <input type='hidden' name='id' className='c-wconfig__input c-wconfig__placeid' defaultValue={place.id} />
                            </td>
                        </tr>
                        <tr>
                            <th>{__(LocalesNames.days)}:</th>
                            <td>
                                <input type='number' maxLength={1} name='days' className='c-wconfig__input' defaultValue='3' max={9} min={1} />
                            </td>
                        </tr>
                        <tr>
                            <th>{__(LocalesNames.base_color)}:</th>
                            <td>
                                <input type='text' maxLength={6} name='color' className='c-wconfig__input' defaultValue='68a7d4' />
                            </td>
                        </tr>
                        <tr>
                            <th>{__(LocalesNames.item_color)}:</th>
                            <td>
                                <input type='text' maxLength={6} name='itemcolor' className='c-wconfig__input' placeholder='auto' />
                            </td>
                        </tr>
                        <tr>
                            <th>{__(LocalesNames.text_color)}:</th>
                            <td>
                                <input type='text' maxLength={6} name='textcolor' className='c-wconfig__input' placeholder='auto' />
                            </td>
                        </tr>
                        <tr>
                            <th>{__(LocalesNames.position)}:</th>
                            <td>
                                <select name='pos' className='c-wconfig__input'>
                                    <option value='v' defaultChecked={true}>{__(LocalesNames.vertical)}</option>
                                    <option value='h'>{__(LocalesNames.horizontal)}</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>{__(LocalesNames.width)}:</th>
                            <td>
                                <input type='number' maxLength={3} name='w' className='c-wconfig__input' defaultValue='250' max={999} min={50} />
                            </td>
                        </tr>
                        <tr>
                            <th>{__(LocalesNames.show_header)}:</th>
                            <td>
                                <input type='checkbox' name='header' className='c-wconfig__input' defaultChecked={true} />
                            </td>
                        </tr>
                        <tr>
                            <th></th>
                            <td>
                                <button className='c-wconfig__btn c-btn c-btn--primary c-btn--small'>{__(LocalesNames.generate)}</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
