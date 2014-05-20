package ora.camera4dummies.camera4dummiesandroid;

/**
 * Created by joaobiriba on 17/05/14.
 */

import android.os.Bundle;

import com.jeremyfeinstein.slidingmenu.lib.SlidingMenu;


public class LeftAndRightActivity extends BaseActivity {

    public LeftAndRightActivity() {
        super(R.string.left_and_right);
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        getSlidingMenu().setMode(SlidingMenu.LEFT_RIGHT);
        getSlidingMenu().setTouchModeAbove(SlidingMenu.TOUCHMODE_FULLSCREEN);

        setContentView(R.layout.content_frame);
        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.content_frame, new MainSparqlQuery())
                .commit();


        getSlidingMenu().setMenu(R.layout.menu_frame_three);
        getSlidingMenu().setShadowDrawable(R.drawable.shadowleft);
        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.menu_frame_three, new MapYellowFragment())
                .commit();




      /*  getSlidingMenu().setMenu(R.layout.interactive_map_fragment);
        getSlidingMenu().setShadowDrawable(R.drawable.shadowleft);
        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.interactiveMapFragment, new ItalianInteractiveMap())
                .commit();*/

        getSlidingMenu().setSecondaryMenu(R.layout.menu_frame);
        getSlidingMenu().setSecondaryShadowDrawable(R.drawable.shadowright);
        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.menu_frame, new MapFragment())
                .commit();


    }

}