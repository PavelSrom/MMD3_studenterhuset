import React, { Fragment, useState } from 'react'
import WithGradient from '../../hoc/WithGradient'
import classes from './Rules.module.css'

const Rules = () => {
  const [steps] = useState([
    {
      headline: 'People in charge',
      description:
        'During office hours, Studenterhuset employees handle all non trivial situations regarding the house. During a music event, the coordinator/s are in responsible and in charge in regards to all situations regarding the event. Bar-chiefs or a united bar-staff are responsible and in charge in regards to all situations in regards to the bar. If a situation that involves both departments the people in charge makes the decision together. '
    },
    {
      headline: 'Alcohol on shift',
      description:
        "Volunteering at Studenterhuset involves customer interaction, moving of heavy or expensive equipment and dealing with drunk customers. Because of this a Studenterhus has an insurance that covers volunteers and employees. To be covered by the insurance your blood alcohol level must not be more than 0.05% equal to drinking one beer/drink In addition the law regarding drugs must be respected Studenterhuset has no real way to check your blood alcohol level, this means that its self-regulated if you're above the allowed amount. A person in charge can decide that a volunteer is too drunk, and can send that volunteer home."
    },
    {
      headline: 'Communication and idea development',
      description:
        'Events for and by volunteers should as a minimum be announced on the facebook group "Volunteers of Studenterhuset Aalborg". Additionally the facebook group is a forum where everything can be discussed, the more discussion and idea development the better. If a volunteer starts a discussion about ideas for the house, he or she should be ready to take part in putting the idea into practice, and can not expect someone will take care of it. Discussions about Studenterhuset current and future workings should only be discussed by active volunteers. Former volunteers should only partake in the discussion if they have relevant historical knowledge that can help.'
    },
    {
      headline: 'Shifts',
      description: `When a volunteer takes a shift, through a chief or via Studenterhusets scheduling system. He or she is responsible for that shift, meaning that the volunteer is responsible to find a replacement if he or she, cant show up. Emergency situations are, of course, exempt. 
      When you have  a shift at Studenterhuset you are wearing the official Studenterhus T-shirt 
      As soon as the shift is over, the volunteer should put on their regular clothing. When you are wearing a Studenterhus T-shirt you are representing Studenterhuset in what you are doing and saying, It's important that you behave exemplary. 
      The Bartender chooses what music is played during their shift, as long as it reflect the mood in the cafe. Remember the music is for everyone in the cafe not just for you! The sound level should always reflect the mood in the cafe. During concert days, the coordinator can choose which music should be played an hour before the doors open, and an hour after the concert is over.`
    },
    {
      headline: 'Throwing people out',
      description:
        'Guests can only be throw out by people in charge. You can ​only​ throw people out if you are wearing a Studenterhus T-shirt. People who are thrown out are banned from entering for the rest of the day, unless they have been banned for life by the office.'
    },
    {
      headline: 'Prices during and after a shift',
      description:
        'Volunteers who are on shift can during the shift buy ​Non-alcoholic​ beverages for them self for token-price but without using a token. After your shift Studenterhuset offers an after shift- beer, soda or hot cocoa. Your aftershift beverage is personal and cannot be given to friends and family or other volunteer, unless they are also on shift. All other times volunteers must use a token to get token-price. If the volunteer dont have a token they must pay full price.'
    },
    {
      headline: 'Volunteer are guests when they are not on shift',
      description:
        "Volunteer are always welcome at Studenterhuset, when they don't have a shift. Even Though the house is busy, it's okay and accepted that you do not help out. You are working as a volunteer and should not feel bad about using the house a guest, even when its busy. This also means that volunteers not on shift should behave as guests, so no self-service, no use of the kitchen or other facilities that are being used by the volunteers on shift."
    },
    {
      headline: 'People on shift are in charge',
      description:
        "When you use the house as a guest, it's important to respect the volunteers who are on shift, who are working hard for Studenterhuset. This means that you behave exemplary and don't involve yourself in decisions, and don't take liberties, like a regular guest would. It's the volunteers on shift who has the responsibility and are in charge. This means that you don't enter the bar when others are on shift."
    },
    {
      headline: 'After closing',
      description: `All guests need to leave Studenterhuset when the house closes. it is illegal to serve and sell to anyone after closing hours. If the police finds out, it will result in a fine for all guests/volunteer present in the house, The bartenders who had the closing shift will get a bigger fine, and Studenthuset will receive a big fine. This applies to all guests, who are not volunteers and has worked during the day, No exception even for family and close friends It is allowed for volunteers who has worked at Studenterhuset during the day to sit down and have an aftershift beer, and relax after their shift has ended. Everyone has to leave Studenterhuset no later than 2. hours after the last shift has ended. All volunteers should 
      help clean or leave when Studenterhuset closes for the day. The bartenders on the evening shift are responsible for closing down Studenterhuset, even if there are volunteers who want to sit and drink their aftershift beer. In the event that the bartenders responsible don't want to sit and drink an aftershift beer, he or she can pass on the responsibility to another, if he or she wants to or is capable of handling the responsibility. If this isn't possible everyone needs to leave Studenterhuset and closing will be done like every evening.`
    },
    {
      headline: 'Concerts in the cafe',
      description:
        "Concerts can be held in the cafe, and can require an entrance fee. Music and bar volunteers help each other with setting up before the concert, and cleaning after the concert. No one is done working until everything is cleaned. Volunteers can't expect to enter Studenterhuset if a concert or another event is held in the cafe. Prices for volunteers will be announced at the latests on the day the concert is held."
    },
    {
      headline: 'Festivals',
      description:
        'To get a wristband for one of Studenterhusets festivals, a volunteer needs to have two shift of either 5 or 6 hours duration or one 12 hour shift during the festival. After a festival, all volunteers who worked during the festival and has helped clean up will can have an aftershift beer. Cleaning tasks will be arranged by the music and bar coordinators for that evening.'
    },
    {
      headline: 'Free access to concerts',
      description:
        'Volunteers who has had a shift on the same day as a koncert, can get in to the concert for free. If you have signed up for a shift before the start of a week, you can get in to all concert that week for free. In the event of a sold out concert or a Concert paid for by someone other than Studenterhuset, Volunteers can be denied entrance. Information about this will sent out at the latests on the day of the concert.'
    },
    {
      headline: 'Committee work',
      description:
        'So that everyone can know about decisions regarding the workings of Studenterhuset, its required that every Committee submit minutes from their meeting. These should be published and be available to all volunteers.'
    }
  ])
  const [currStep, setCurrStep] = useState(0)

  return (
    <Fragment>
      <div className={classes.header}>
        <WithGradient thin blue style={{ marginRight: 10 }}>
          <i className="fas fa-question-circle"></i>
        </WithGradient>
        <h6>House rules</h6>
      </div>
      <div style={{ marginLeft: 46 }}>
        <p>
          Studenterhuset house rules describe guidelines for Studenterhuset
          daily working and operations. Changes to the house rules are discussed
          and voted on at a common meeting, and has to be available seven days
          before the common meeting, so everyone has time to read them.
        </p>
      </div>

      {/* boxes with different text */}
      <div className={classes.ruleBox}>
        <div className={classes.info}>
          <h5>{steps[currStep].headline}</h5>
          <p>{steps[currStep].description}</p>
        </div>
        {/* fixed step indicator on the left side */}
        <div className={classes.stepBox}>
          {steps.map((step, index) =>
            // if the index is equal to the currently chosen step,
            // we make the background yellow with the 'style' prop
            // otherwise, it's grey
            index === currStep ? (
              <div
                key={index}
                className={classes.stepNumber}
                onClick={() => setCurrStep(index)}
                style={{ background: '#ffbf26' }}
              >
                <p>{index + 1}</p>
              </div>
            ) : (
              <div
                key={index}
                className={classes.stepNumber}
                onClick={() => setCurrStep(index)}
              >
                <p>{index + 1}</p>
              </div>
            )
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default Rules
