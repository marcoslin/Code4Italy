package ora.camera4dummies.camera4dummiesandroid;


import android.app.Activity;
import android.graphics.Bitmap;
import android.graphics.Matrix;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import java.util.HashMap;
import java.util.Map;

/**
 * @author esses77
 *
 */
public class ItalianInteractiveMap extends Fragment implements View.OnTouchListener{

    private final Map<Integer, String> colleggiColori = new HashMap<Integer, String>(27);
    private ImageView hiddenMapImageView = null;
    private ImageView visibleMapImageView = null;

    /* (non-Javadoc)
     * @see android.support.v4.app.Fragment#onResume()
     */
    @Override
    public void onResume() {
        // TODO Auto-generated method stub
      //  hiddenMapImageView = (ImageView)this.getView().findViewById(R.id.interactiveMapHiddenImageView);
      //  visibleMapImageView = (ImageView)this.getView().findViewById(R.id.interactiveMapVisibleImageView);
        hiddenMapImageView.setOnTouchListener(this);

        super.onResume();
    }

    private ImageView interactiveMapImageView = null;

    public ItalianInteractiveMap() {
        super();
        // TODO Auto-generated constructor stub

        colleggiColori.put(Integer.valueOf(0xff000064), "PIEMONTE 1");
        colleggiColori.put(Integer.valueOf(0xff000080), "PIEMONTE 2");

        colleggiColori.put(Integer.valueOf(0xff078f07), "VALLE D'AOSTA");

        colleggiColori.put(Integer.valueOf(0xff053f05), "LIGURIA");

        colleggiColori.put(Integer.valueOf(0xff263b26), "LOMBARDIA 1");
        colleggiColori.put(Integer.valueOf(0xff2c7a2c), "LOMBARDIA 2");
        colleggiColori.put(Integer.valueOf(0xff4d6c4d), "LOMBARDIA 3");

        colleggiColori.put(Integer.valueOf(0xff697369), "TRENTINO-ALTO ADIGE");

        colleggiColori.put(Integer.valueOf(0xff82bd82), "VENETO 1");
        colleggiColori.put(Integer.valueOf(0xff92d992), "VENETO 2");

        colleggiColori.put(Integer.valueOf(0xff188318), "FRIULI-VENEZIA GIULIA");

        colleggiColori.put(Integer.valueOf(0xff3bd03b), "EMILIA-ROMAGNA");

        colleggiColori.put(Integer.valueOf(0xff4fad4f), "TOSCANA");
    }

    /* (non-Javadoc)
     * @see android.support.v4.app.Fragment#onActivityCreated(android.os.Bundle)
     */
    @Override
    public void onActivityCreated(Bundle savedInstanceState) {
        // TODO Auto-generated method stub
        super.onActivityCreated(savedInstanceState);
    }

    /* (non-Javadoc)
     * @see android.support.v4.app.Fragment#onAttach(android.app.Activity)
     */
    @Override
    public void onAttach(Activity activity) {
        // TODO Auto-generated method stub

        super.onAttach(activity);
    }

    /* (non-Javadoc)
     * @see android.support.v4.app.Fragment#onCreate(android.os.Bundle)
     */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        // TODO Auto-generated method stub
        super.onCreate(savedInstanceState);



    }

    /* (non-Javadoc)
     * @see android.support.v4.app.Fragment#onCreateView(android.view.LayoutInflater, android.view.ViewGroup, android.os.Bundle)
     */
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.mapyellowfragment, container, false);

        return view;
    }

    /* (non-Javadoc)
     * @see android.support.v4.app.Fragment#onDestroy()
     */
    @Override
    public void onDestroy() {
        // TODO Auto-generated method stub
        super.onDestroy();
    }

    /* (non-Javadoc)
     * @see android.support.v4.app.Fragment#onDestroyView()
     */
    @Override
    public void onDestroyView() {
        // TODO Auto-generated method stub
        super.onDestroyView();
    }

    /* (non-Javadoc)
     * @see android.support.v4.app.Fragment#onDetach()
     */
    @Override
    public void onDetach() {
        // TODO Auto-generated method stub
        super.onDetach();
    }

    @Override
    public boolean onTouch(View v, MotionEvent event) {
        // TODO Auto-generated method stub
/*		double x = event.getX();
		double y = event.getY();
		android.util.Log.i(this.getClass().toString(), x +" "+ y);

		ImageView view = (ImageView)v;
		Bitmap bitmap;
		if (view.getDrawable() instanceof BitmapDrawable) {
		    bitmap = ((BitmapDrawable) view.getDrawable()).getBitmap();
		} else {
		    Drawable d = view.getDrawable();
		    bitmap = Bitmap.createBitmap(d.getIntrinsicWidth(), d.getIntrinsicHeight(), Bitmap.Config.ARGB_8888);
		    Canvas canvas = new Canvas(bitmap);
		    d.draw(canvas);
		}

//		//Limit x, y range within bitmap
//		   if(x < 0){
//		    x = 0;
//		   }else if(x > bitmap.getWidth()-1){
//		    x = bitmap.getWidth()-1;
//		   }
//
//		   if(y < 0){
//		    y = 0;
//		   }else if(y > bitmap.getHeight()-1){
//		    y = bitmap.getHeight()-1;
//		   }

		int x2 = (int)event.get

		int touchedRGB = bitmap.getPixel((int)event.getX(), (int)event.getY());
		android.util.Log.i(this.getClass().toString(), "Touched pixel with Red("+Color.red(touchedRGB)+") Green("+ Color.green(touchedRGB) +") Blue("+ Color.blue(touchedRGB) +")");



		return false;*/
        if (event.getAction() == MotionEvent.ACTION_DOWN)
        {
            //your code
            float eventX = event.getX();
            float eventY = event.getY();
            float[] eventXY = new float[] {eventX, eventY};

            Matrix invertMatrix = new Matrix();
            ((ImageView)v).getImageMatrix().invert(invertMatrix);

            invertMatrix.mapPoints(eventXY);
            int x = Integer.valueOf((int)eventXY[0]);
            int y = Integer.valueOf((int)eventXY[1]);

            Drawable imgDrawable = ((ImageView)v).getDrawable();
            Bitmap bitmap = ((BitmapDrawable)imgDrawable).getBitmap();

            //Limit x, y range within bitmap
            if(x < 0){
                x = 0;
            }else if(x > bitmap.getWidth()-1){
                x = bitmap.getWidth()-1;
            }

            if(y < 0){
                y = 0;
            }else if(y > bitmap.getHeight()-1){
                y = bitmap.getHeight()-1;
            }

            int touchedRGB = bitmap.getPixel(x, y);

            android.util.Log.i(this.getClass().toString(),"touched color: " + "#" + Integer.toHexString(touchedRGB)+ " = "+colleggiColori.get(Integer.valueOf(touchedRGB)));
        }

        return true;
    }

}
