package com.example.heidthecamp.theupsiddown;

import android.content.Intent;
import android.os.StrictMode;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.net.Socket;

import com.example.heidthecamp.theupsiddown.networkSettings;

public class MainActivity extends AppCompatActivity {
    public static final  String EXTRA_MESSAGE = "com.example.theupsidedown.MESSAGE";
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        StrictMode.ThreadPolicy policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);

        Intent intent = getIntent();
    }

    public void sendMessage(View view){

        Intent intent = new Intent(this, MainActivity.class);
        EditText editText = (EditText) findViewById(R.id.editText);
        String message = editText.getText().toString();
        intent.putExtra(EXTRA_MESSAGE, message);

        Socket s = null;
        OutputStreamWriter osw;

        try{
            String ip = networkSettings.getIp();
            s = new Socket(ip, 8888);
            s.getOutputStream().write(message.getBytes());
        }
        catch (IOException e){
            e.printStackTrace();
        }
    }
}
