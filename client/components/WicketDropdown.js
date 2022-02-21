import React, { useState } from 'react';
import { View } from 'react-native';
import SearchableDropdown from "react-native-searchable-dropdown";

const WicketDropdown = ({setType}) => {
    const [selectedItem, setSelectedItem] = useState("");
    const items = [
        {
            id : 1, name : 'Bowled', value : 'bowled'
        },
        {
            id : 2, name : 'Caught' , value : 'caught'
        },
        {
            id : 3, name : 'Stumping' , value : 'stumping'
        },
        {
            id : 4, name :  'Run out striker', value: 'runOutStriker'
        },
        {
            id : 5, name : 'Run out non striker' ,value: 'runOutNonStriker'
        },
        {
            id : 6 , name : 'Boundary out' , value : 'boundaryOut' ,
        },
        {
            id : 7 , name : 'Leg Before Wicket' , value : 'lbw',
        },
        {
            id : 8 , name : 'Hit Wicket' , value : 'hitWicket'
        },
        {
            id : 9 , name : 'Obstructing the field' , value : 'obstructing'
        },
        {
            id : 10 , name : 'Handling the ball' , value : 'handling'
        }

    ]
    return (
        <View>
            <SearchableDropdown
                multi={false}
        
                onItemSelect={(item) => {
                    setSelectedItem(item);
                    setType(item?.value);
                }}
                
                containerStyle={{ padding: 5 }}
        
                itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: '#ddd',
                borderColor: '#bbb',
                borderWidth: 1,
                borderRadius: 5,
                }}
                itemTextStyle={{ color: '#222' }}
                itemsContainerStyle={{ maxHeight: 200 }}
                items={items}
                defaultIndex={0}
                resetValue={false}
                textInputProps={
                {
                    placeholder: selectedItem?.name ? selectedItem?.name : 'Mode of Dismissal',
                    underlineColorAndroid: "transparent",
                    style: {
                        padding: 12,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        borderRadius: 5,
                    },
                }
                }
                listProps={
                {
                    nestedScrollEnabled: true,
                }
                }
            />
        </View>
    );
};

export default WicketDropdown;
